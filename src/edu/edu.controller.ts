import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEduDto } from "./dto/create-edu.dto";
import { UpdateEduDto } from "./dto/update-edu.dto";
import { EduService } from "./edu.service";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { accessMatrix } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Education")
@Controller("edu")
export class EduController {
  constructor(private readonly eduService: EduService) {}

  @Get("job-seeker/:jobSeekerId")
  @ApiOperation({ summary: "Get all educational information of jobseeker" })
  @ApiResponse({
    status: 200,
    description: "All educational information of jobseeker",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "edu"))
  @UseGuards(AuthGuard) 
  async getAllEducationByJobSeekerId(
    @Param("jobSeekerId") jobSeekerId: number,
  ) {
    return this.eduService.getAllEducationByJobSeekerId(jobSeekerId);
  }

  @ApiOperation({ summary: "Create new educational information of jobseeker" })
  @ApiResponse({ status: 201, description: "Educational information created" })
  @ApiBody({ type: CreateEduDto })
  @UseGuards(new AccessControlGuard(accessMatrix, "edu"))
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEduDto: CreateEduDto) {
    return this.eduService.create(createEduDto);
  }

  @ApiOperation({ summary: "Get all educational information" })
  @ApiResponse({ status: 200, description: "All educational information" })
  @UseGuards(new AccessControlGuard(accessMatrix, "edu"))
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.eduService.findAll();
  }

  @ApiOperation({ summary: "Get one educational information" })
  @ApiResponse({ status: 200, description: "One educational information" })
  @Get(":id")
  @UseGuards(new AccessControlGuard(accessMatrix, "edu"))
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.eduService.findOne(+id);
  }

  @ApiOperation({ summary: "Update educational information" })
  @ApiResponse({ status: 200, description: "Educational information updated" })
  @UseGuards(new AccessControlGuard(accessMatrix, "edu"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEduDto: UpdateEduDto) {
    return this.eduService.update(+id, updateEduDto);
  }

  @ApiOperation({ summary: "Delete educational information" })
  @ApiResponse({ status: 200, description: "Educational information deleted" })
  @UseGuards(new AccessControlGuard(accessMatrix, "edu"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eduService.remove(+id);
  }
}
