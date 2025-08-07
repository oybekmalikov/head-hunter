export const ROLES_KEY = 'roles';
export type RolesType = 'admin' | 'employer' | 'jobseeker' | 'user';
export const accessMatrix = {
	users: ['admin', 'employer', 'jobseeker'],
	jobSeekers: ['admin', 'jobseeker'],
	employers: ['admin', 'employer'],
	companies: ['admin', 'employer'],
	jobPostings: ['admin', 'employer', 'jobseeker'],
	jobCategories: ['admin', 'employer', 'jobseeker'],
	skillsCategory: ['admin', 'employer', 'jobseeker'],
	skills: ['admin', 'employer', 'jobseeker'],
	jobSeekerSkills: ['admin', 'employer', 'jobseeker'],
	jobSeekerPostings: ['admin', 'employer', 'jobseeker'],
	jobApplication: ['admin', 'employer', 'jobseeker'],
	chat: ['admin', 'employer', 'jobseeker'],
	edu: ['admin', 'employer', 'jobseeker'],
	jobNotifications: ['admin', 'jobseeker'],
	workExperience: ['admin', 'employer', 'jobseeker'],
	savedJobs: ['admin', 'jobseeker'],
};