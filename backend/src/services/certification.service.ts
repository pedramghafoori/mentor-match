import axios from 'axios';
import { config } from '../config/config';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
}

export class CertificationService {
  private static instance: CertificationService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = config.externalApi.baseUrl;
  }

  public static getInstance(): CertificationService {
    if (!CertificationService.instance) {
      CertificationService.instance = new CertificationService();
    }
    return CertificationService.instance;
  }

  async getCertificationsByLssId(lssId: string): Promise<Certification[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/certifications/${lssId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching certifications:', error);
      throw new Error('Failed to fetch certifications');
    }
  }

  async verifyCertification(lssId: string, certificationId: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/certifications/${lssId}/verify/${certificationId}`
      );
      return response.data.isValid;
    } catch (error) {
      console.error('Error verifying certification:', error);
      throw new Error('Failed to verify certification');
    }
  }
} 