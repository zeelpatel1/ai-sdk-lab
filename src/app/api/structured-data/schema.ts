import {z} from 'zod'

export const resumeSchema=z.object({
    name:z.string(),
    email:z.email(),
    phone:z.string(),
    skills:z.array(z.string()),
    experience:z.array(
        z.object({
            company:z.string(),
            role: z.string(),
            description: z.string(),
            duration: z.string(),
        })
    ),
    education:z.array(
        z.object({
            institution: z.string(),
            degree: z.string(),
            year:z.string()
        })
    ),
    projects:z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            techStack: z.array(z.string())
        })
    )
})