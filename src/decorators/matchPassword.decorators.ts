import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (args.constraints.length === 0) {
      return false;
    }

    const relatedPasswordKey = args.constraints[0] as string;
    const relatedPassword = (args.object as Record<string, unknown>)[
      relatedPasswordKey
    ];

    return password === relatedPassword;
  }
  defaultMessage(): string {
    return 'Las contraseñas no coinciden';
  }
}
