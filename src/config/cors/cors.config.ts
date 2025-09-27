import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
  origin: [
    'http://localhost:3200',
    'https://n8n.logosnext.com.br',
    'https://logosnext.com.br/bechirah',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowHeaders: ['Content-Type', 'Authorization'],
}));
