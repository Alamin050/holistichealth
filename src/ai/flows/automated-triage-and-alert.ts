'use server';
/**
 * @fileOverview An automated triage AI agent that determines patient risk levels based on vitals and adherence, and triggers alerts to doctors.
 *
 * - automatedTriageAndAlert - A function that handles the automated triage process.
 * - AutomatedTriageAndAlertInput - The input type for the automatedTriageAndAlert function.
 * - AutomatedTriageAndAlertOutput - The return type for the automatedTriageAndAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedTriageAndAlertInputSchema = z.object({
  vitals: z.object({
    heartRate: z.number().describe('Patient heart rate in beats per minute.'),
    bloodPressure: z.string().describe('Patient blood pressure, e.g., 120/80.'),
    temperature: z.number().describe('Patient temperature in Celsius.'),
    oxygenSaturation: z
      .number()
      .describe('Patient oxygen saturation percentage.'),
  }).describe('Patient vital signs data.'),
  adherence: z
    .number()
    .describe(
      'Patient medication adherence as a percentage (0-100), with 100 indicating full adherence.'
    ),
  hospitalId: z.string().describe('The hospital ID of the patient.'),
  patientName: z.string().describe('The name of the patient.'),
});
export type AutomatedTriageAndAlertInput = z.infer<typeof AutomatedTriageAndAlertInputSchema>;

const AutomatedTriageAndAlertOutputSchema = z.object({
  riskLevel: z
    .enum(['RED', 'YELLOW', 'GREEN'])
    .describe(
      'The risk level of the patient, where RED is critical, YELLOW is warning, and GREEN is stable.'
    ),
  explanation: z
    .string()
    .describe('Explanation of why the patient was assigned the given risk level.'),
  recommendations: z
    .string()
    .describe('Recommendations for the doctor based on the risk level.'),
  alertDoctor: z
    .boolean()
    .describe(
      'A boolean value indicating whether an alert should be sent to the doctor. Send if RED or YELLOW.'
    ),
});
export type AutomatedTriageAndAlertOutput = z.infer<typeof AutomatedTriageAndAlertOutputSchema>;

export async function automatedTriageAndAlert(
  input: AutomatedTriageAndAlertInput
): Promise<AutomatedTriageAndAlertOutput> {
  return automatedTriageAndAlertFlow(input);
}

const automatedTriageAndAlertPrompt = ai.definePrompt({
  name: 'automatedTriageAndAlertPrompt',
  input: {schema: AutomatedTriageAndAlertInputSchema},
  output: {schema: AutomatedTriageAndAlertOutputSchema},
  prompt: `You are an AI assistant that determines the risk level of a patient based on their vital signs and medication adherence.

  Here is the patient's information:
  Patient Name: {{{patientName}}}
  Hospital ID: {{{hospitalId}}}
  Vitals: Heart Rate: {{{vitals.heartRate}}} bpm, Blood Pressure: {{{vitals.bloodPressure}}}, Temperature: {{{vitals.temperature}}} °C, Oxygen Saturation: {{{vitals.oxygenSaturation}}}%
  Adherence: {{{adherence}}}%

  Determine the risk level (RED, YELLOW, or GREEN) based on the following criteria:
  - RED: Critical condition requiring immediate attention. Criteria include significantly abnormal vital signs or very low adherence.
  - YELLOW: Warning condition requiring close monitoring. Criteria include moderately abnormal vital signs or low adherence.
  - GREEN: Stable condition. Criteria include normal vital signs and good adherence.

  Explain your reasoning for assigning the risk level and provide recommendations for the doctor.

  Based on the risk level, determine whether to alert the doctor (true if RED or YELLOW, false if GREEN). The alertDoctor value must be a boolean.
  Return the riskLevel, explanation, recommendations, and alertDoctor in JSON format.
  `,
});

const automatedTriageAndAlertFlow = ai.defineFlow(
  {
    name: 'automatedTriageAndAlertFlow',
    inputSchema: AutomatedTriageAndAlertInputSchema,
    outputSchema: AutomatedTriageAndAlertOutputSchema,
  },
  async input => {
    const {output} = await automatedTriageAndAlertPrompt(input);
    return output!;
  }
);
