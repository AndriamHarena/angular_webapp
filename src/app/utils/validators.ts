export class Validators {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    return Boolean(password && password.length >= 6);
  }

  static passwordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  static isRequired(value: string): boolean {
    return Boolean(value && value.trim().length > 0);
  }
}
