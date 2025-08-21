export const ROLES_KEY = "roles";
export type RolesType = "admin" | "employer" | "jobseeker" | "user";
export const accessMatrix = {
  users: ["superadmin", "admin", "employer", "jobseeker", "user"],
  jobSeekers: ["superadmin", "admin", "jobseeker", "user"],
  employers: ["superadmin", "admin", "employer", "user"],
  companies: ["superadmin", "admin", "employer", "jobseeker", "user"],
  jobPostings: ["superadmin", "admin", "employer", "jobseeker"],
  jobCategories: ["superadmin", "admin", "employer", "jobseeker"],
  skillsCategory: ["superadmin", "admin", "employer", "jobseeker"],
  skills: ["superadmin", "admin", "employer", "jobseeker"],
  jobSeekerSkills: ["superadmin", "admin", "employer", "jobseeker"],
  jobSeekerPostings: ["superadmin", "admin", "employer", "jobseeker"],
  jobApplication: ["superadmin", "admin", "employer", "jobseeker"],
  chat: ["superadmin", "admin", "employer", "jobseeker"],
  edu: ["superadmin", "admin", "employer", "jobseeker"],
  jobNotifications: ["superadmin", "admin", "jobseeker"],
  workExperience: ["superadmin", "admin", "employer", "jobseeker"],
  savedJobs: ["superadmin", "admin", "jobseeker"],
};
