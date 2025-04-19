import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule], // Adicione isto para garantir que ConfigService está disponível
      useFactory: (configService: ConfigService) => {
        // Removido async desnecessário
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRATION_TIME');

        if (!secret || !expiresIn) {
          throw new Error('JWT configuration is missing');
        }

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn.includes('s') ? expiresIn : `${expiresIn}s`, // Garante formato correto
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  // ... outros componentes
})
export class AuthModule {}
