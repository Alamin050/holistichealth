"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QrCode, ClipboardCopy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const protocolSchema = z.object({
  patientName: z.string().min(2, "Patient name is required."),
  hospitalId: z.string().min(1, "Hospital ID is required."),
  careProtocol: z.string().min(10, "Care protocol must be at least 10 characters."),
  medicine: z.string().min(2, "Medicine name is required."),
});

type ProtocolFormValues = z.infer<typeof protocolSchema>;

type GeneratedProtocol = ProtocolFormValues & {
  qrCodeUrl: string;
};

export function ProtocolBuilder() {
  const [generatedProtocol, setGeneratedProtocol] = useState<GeneratedProtocol | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ProtocolFormValues>({
    resolver: zodResolver(protocolSchema),
    defaultValues: {
      patientName: "",
      hospitalId: "",
      careProtocol: "",
      medicine: "",
    },
  });

  function onSubmit(data: ProtocolFormValues) {
    const queryParams = new URLSearchParams({
        patientName: data.patientName,
        hospitalId: data.hospitalId,
        careProtocol: data.careProtocol,
        medicine: data.medicine,
    }).toString();
    const patientUrl = `${window.location.origin}/patient/qr-auth?${queryParams}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(patientUrl)}`;

    setGeneratedProtocol({ ...data, qrCodeUrl });
  }
  
  function handleCopyToClipboard() {
    if (generatedProtocol) {
      const patientUrl = `${window.location.origin}/patient/qr-auth?${new URLSearchParams({
        patientName: generatedProtocol.patientName,
        hospitalId: generatedProtocol.hospitalId,
        careProtocol: generatedProtocol.careProtocol,
        medicine: generatedProtocol.medicine,
      }).toString()}`;
      navigator.clipboard.writeText(patientUrl);
      toast({
        title: "Copied to clipboard!",
        description: "Patient URL has been copied.",
      });
    }
  }

  function handleReset() {
    setGeneratedProtocol(null);
    form.reset();
  }

  if (generatedProtocol) {
    return (
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Protocol Generated</CardTitle>
          <CardDescription>Share this QR code or link with the patient for them to get started.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="p-4 bg-white rounded-lg border">
            <Image
              src={generatedProtocol.qrCodeUrl}
              alt="Patient Protocol QR Code"
              width={250}
              height={250}
              priority
              unoptimized
            />
          </div>
          <div className="w-full text-sm space-y-2">
            <p><strong>Patient:</strong> {generatedProtocol.patientName}</p>
            <p><strong>Hospital ID:</strong> {generatedProtocol.hospitalId}</p>
            <p><strong>Medicine:</strong> {generatedProtocol.medicine}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleCopyToClipboard} className="w-full sm:w-auto">
            <ClipboardCopy /> Copy Link
          </Button>
          <Button variant="secondary" onClick={handleReset} className="w-full sm:w-auto">
            <RefreshCw /> New Protocol
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Protocol Builder</CardTitle>
        <CardDescription>Create a new care protocol and generate a patient QR code.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hospitalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital ID</FormLabel>
                    <FormControl>
                      <Input placeholder="PID-12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="medicine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescribed Medicine</FormLabel>
                  <FormControl>
                    <Input placeholder="Aspirin 500mg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careProtocol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Care Protocol</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Take one pill daily with food. Monitor blood pressure twice a day..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
              <QrCode />
              Generate Protocol & QR Code
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
