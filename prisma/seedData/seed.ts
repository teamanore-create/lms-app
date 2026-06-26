import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.enrollment.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.course.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create sample courses
  const courses = [
    {
      title: 'BIM Fundamentals with Revit',
      description:
        'Master the basics of Building Information Modeling and learn to create professional architectural models using Autodesk Revit.',
      category: 'BIM',
      level: 'Beginner',
      duration: '40 hours',
      price: 299,
      instructor: 'John Smith',
      rating: 4.8,
      ratingCount: 245,
    },
    {
      title: 'Advanced Revit for Architects',
      description:
        'Take your Revit skills to the next level with advanced modeling techniques, family creation, and project management.',
      category: 'Revit',
      level: 'Advanced',
      duration: '50 hours',
      price: 399,
      instructor: 'Sarah Johnson',
      rating: 4.9,
      ratingCount: 189,
    },
    {
      title: 'AutoCAD Professional Training',
      description:
        'Learn AutoCAD from scratch and become proficient in 2D drafting and 3D design for engineering and construction.',
      category: 'AutoCAD',
      level: 'Beginner',
      duration: '35 hours',
      price: 249,
      instructor: 'Mike Chen',
      rating: 4.7,
      ratingCount: 312,
    },
    {
      title: 'Civil 3D for Infrastructure Design',
      description:
        'Learn Civil 3D for road, bridge, and site design. Perfect for civil engineers and infrastructure professionals.',
      category: 'Civil 3D',
      level: 'Intermediate',
      duration: '45 hours',
      price: 349,
      instructor: 'Emma Wilson',
      rating: 4.6,
      ratingCount: 156,
    },
    {
      title: 'Revit MEP Systems Design',
      description:
        'Specialize in MEP (Mechanical, Electrical, Plumbing) systems design using Autodesk Revit.',
      category: 'Revit',
      level: 'Advanced',
      duration: '48 hours',
      price: 399,
      instructor: 'David Brown',
      rating: 4.8,
      ratingCount: 134,
    },
    {
      title: 'BIM Project Management Essentials',
      description:
        'Learn how to manage BIM projects effectively, coordinate teams, and deliver successful construction projects.',
      category: 'BIM',
      level: 'Intermediate',
      duration: '30 hours',
      price: 299,
      instructor: 'Lisa Anderson',
      rating: 4.7,
      ratingCount: 198,
    },
  ]

  const createdCourses = await Promise.all(
    courses.map((course) =>
      prisma.course.create({
        data: course,
      })
    )
  )

  console.log(`✅ Created ${createdCourses.length} courses`)

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Robert Martinez',
      role: 'Architect at ArchDesign Studio',
      content:
        'The BIM Fundamentals course transformed my workflow. Highly recommended for anyone starting their BIM journey!',
      rating: 5,
    },
    {
      name: 'Jennifer Lee',
      role: 'Structural Engineer',
      content:
        'Excellent instruction and practical exercises. The instructor really knows their stuff. Worth every penny!',
      rating: 5,
    },
    {
      name: 'Thomas Anderson',
      role: 'Construction Manager',
      content:
        'Finally understand BIM coordination. This course has made our projects run much smoother.',
      rating: 5,
    },
    {
      name: 'Maria Garcia',
      role: 'Project Manager',
      content:
        'The project management course gave me insights I wish I had earlier in my career. Great content!',
      rating: 4,
    },
    {
      name: 'David Kim',
      role: 'Civil Engineer',
      content:
        'Civil 3D training was comprehensive and hands-on. Definitely improved my productivity on design projects.',
      rating: 5,
    },
    {
      name: 'Angela Thompson',
      role: 'AutoCAD Technician',
      content:
        'The AutoCAD course is perfect for beginners but also has advanced content. I learned so much!',
      rating: 4,
    },
  ]

  const createdTestimonials = await Promise.all(
    testimonials.map((testimonial) =>
      prisma.testimonial.create({
        data: testimonial,
      })
    )
  )

  console.log(`✅ Created ${createdTestimonials.length} testimonials`)
  console.log('✨ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })