"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { automatedTriageAndAlert, type AutomatedTriageAndAlertOutput } from '@/ai/flows/automated-triage-and-alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { HeartPulse, Thermometer, Droplet, Wind, AlertTriangle, ShieldCheck, ShieldAlert, Shield, Loader2, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const vitalsSchema = z.object({
  heartRate: z.coerce.number().min(30, "Invalid heart rate.").max(220, "Invalid heart rate."),
  bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, "Format must be SYS/DIA (e.g., 120/80)."),
  temperature: z.coerce.number().min(35, "Temperature too low.").max(43, "Temperature too high."),
  oxygenSaturation: z.coerce.number().min(80, "Saturation too low.").max(100, "Saturation too high."),
  adherence: z.array(z.number()).default([80]),
});

type VitalsFormValues = z.infer<typeof vitalsSchema>;

const riskStyles = {
  RED: 'bg-red-500 border-red-600 text-white',
  YELLOW: 'bg-yellow-400 border-yellow-500 text-black',
  GREEN: 'bg-green-500 border-green-600 text-white',
};
const riskIcons = {
    RED: <ShieldAlert className="h-10 w-10" />,
    YELLOW: <Shield className="h-10 w-10" />,
    GREEN: <ShieldCheck className="h-10 w-10" />,
};

export function Triage({ patientName, hospitalId }: { patientName: string; hospitalId: string }) {
  const [triageResult, setTriageResult] = useState<AutomatedTriageAndAlertOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<VitalsFormValues>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: {
      heartRate: 70,
      bloodPressure: '120/80',
      temperature: 36.8,
      oxygenSaturation: 98,
      adherence: [80],
    },
  });

  async function onSubmit(data: VitalsFormValues) {
    setIsLoading(true);
    setTriageResult(null);
    try {
      const result = await automatedTriageAndAlert({
        vitals: {
          heartRate: data.heartRate,
          bloodPressure: data.bloodPressure,
          temperature: data.temperature,
          oxygenSaturation: data.oxygenSaturation,
        },
        adherence: data.adherence[0],
        patientName,
        hospitalId,
      });
      setTriageResult(result);
      if (result.alertDoctor) {
        toast({
          title: "Doctor Alerted",
          description: "Your doctor has been notified of your condition.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Triage failed:", error);
      toast({
        title: "Error",
        description: "Could not process triage. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Automated Triage</CardTitle>
        <CardDescription>Enter your latest vitals to assess your current health status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="heartRate" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><HeartPulse className="mr-2 h-4 w-4 text-primary" />Heart Rate (bpm)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl><FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="bloodPressure" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Droplet className="mr-2 h-4 w-4 text-primary" />Blood Pressure (SYS/DIA)</FormLabel>
                  <FormControl><Input placeholder="120/80" {...field} /></FormControl><FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="temperature" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Thermometer className="mr-2 h-4 w-4 text-primary" />Temperature (°C)</FormLabel>
                  <FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="oxygenSaturation" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Wind className="mr-2 h-4 w-4 text-primary" />Oxygen Saturation (%)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl><FormMessage />
                </FormItem>
              )}/>
            </div>
            <FormField control={form.control} name="adherence" render={({ field }) => (
              <FormItem>
                <FormLabel>Medication Adherence: {field.value?.[0]}%</FormLabel>
                <FormControl>
                  <Slider defaultValue={[80]} max={100} step={1} onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : 'Analyze Vitals'}
            </Button>
          </form>
        </Form>
        {triageResult && (
          <Card className={cn("mt-6 transition-all duration-500", riskStyles[triageResult.riskLevel])}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    {riskIcons[triageResult.riskLevel]}
                    <div>
                        <CardTitle className="text-3xl font-bold font-headline">Risk Level: {triageResult.riskLevel}</CardTitle>
                        {triageResult.alertDoctor && (
                            <Badge variant="destructive" className="mt-2 flex w-fit items-center gap-1 bg-white/20 text-white">
                                <AlertTriangle className="h-3 w-3" /> Doctor Notified
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="explanation">
                    <AccordionItem value="explanation" className="border-white/30">
                        <AccordionTrigger className="hover:no-underline font-semibold">Explanation</AccordionTrigger>
                        <AccordionContent>{triageResult.explanation}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="recommendations" className="border-b-0 border-white/30">
                        <AccordionTrigger className="hover:no-underline font-semibold">Recommendations</AccordionTrigger>
                        <AccordionContent>{triageResult.recommendations}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
