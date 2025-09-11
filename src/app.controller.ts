import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PageTemplate } from './common/enum';
import { PageTemplateContext } from './common/interface';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  handleHealthCheck() {
    return this.appService.checkHealth();
  }

  @Get('info')
  @ApiExcludeEndpoint()
  @Render(PageTemplate.INFO)
  handleGetWelcomePage(): PageTemplateContext[PageTemplate.INFO] {
    return { name: 'Mohit Ahirwal' };
  }
}
