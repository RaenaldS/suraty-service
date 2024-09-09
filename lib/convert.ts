import { JK } from '@/prisma/generated/client'; // Path ke enum yang sesuai

const convertToJK = (value: string): JK => {
    const validValues: JK[] = [JK.L, JK.P];
  
    if (validValues.includes(value as JK)) {
      return value as JK;
    }
  
    // Melemparkan error jika nilai tidak valid
    throw new Error(`Invalid value for JK: ${value}`);
  };
  
  export default convertToJK;