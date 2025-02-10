import { meta } from "@eslint/js";
import { title } from "framer-motion/client";

export default {
    translation: {
        nav: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            contact: 'Contact',
            blogs: 'Blogs'
        },
        home: {
            greeting: 'Hi, I\'m Fahrettin Rıza Ergin',
            title: 'Full Stack Developer',
            description: 'I create beautiful and functional web applications with modern technologies.',
            hero_descs: [
                "Passionate about creating efficient, scalable, and maintainable code.\n",
                "Specializing in full-stack development with modern technologies."
            ],
            some_use_the_techs: {
                title: "Some of the Technology Stack I Use",
                frontend: "Frontend",
                backend: "Backend",
                database: "Database",
                devops: "DevOps",
            },
            others: {
                commits: { title: "Commits", value: '2+' },
                projects: { title: "Projects", value: '3+' },
                experience: { title: "Experience", value: '5+ years' },
                contributions: { title: "Contributions", value: '5+' },
            },
            latest_blog_posts: {
                title: "Latest Blog Posts",
                description: "I write about my experiences and thoughts about web development, programming, and technology.",
                no_results: {
                    title: "No Blog Posts Found",
                    description: "There are no blog posts to display.",
                }
            }, 
            services: {
                title: "My Services",
                description: "I offer a range of services to help you achieve your goals.",
                service_web_development: {
                    title: "Web Development",
                    description: "Building modern, responsive, and scalable web applications with cutting-edge technologies",
                    properties: [ 
                       "Custom Web Apps",
                       "E-commerce Solutions",
                       "Progressive Web Apps",
                       "API Development"
                    ]
                }, 
                service_mobile_solutions: {
                    title: "Mobile Solutions",
                    description: "Creating cross-platform mobile applications that provide seamless user experiences",
                    properties: [
                        "React Native Apps",
                        "iOS & Android",
                        "App Optimization",
                        "Mobile UI/UX"
                    ]
                },
                service_cloud_devops: {
                    title: "Cloud & DevOps",
                    description: "Implementing cloud solutions and streamlining development operations",
                    properties: [
                        "Docker",
                        "",
                        "",
                        ""
                    ]
                },
                service_uiux_design: {
                    title: "UI/UX Design",
                    description: "Designing intuitive and beautiful user interfaces with modern design principles",
                    properties: [
                        "Responsive Design",
                        "User Research",
                        "Prototyping",
                        "Design Systems"
                    ]
                },
                service_backend_development: {
                    title: "Backend Development",
                    description: "Building robust and scalable server-side applications and APIs",
                    properties: [
                        "API Design",
                        "Database Design",
                        "Microservices",
                        "Performance Optimization"
                    ]
                },
                service_consulting: {
                    title: "Consulting",
                    description: "Providing technical expertise and solutions for your development needs",
                    properties: [
                        "Tech Consulting",
                        "Code Review",
                        "Architecture Design",
                        "Team Training"
                    ]
                },
            },
        },
        about: {
            title: 'About Me',
            description: 'Hello! I\'m a passionate full-stack developer with a strong foundation in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems.',
            experience: 'Professional Experience',
            skills: 'Skills & Technologies',
            desc_sections: {
                section_one: 'Hello! I\'m a passionate full-stack developer with a strong foundation in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems',
                section_two: 'With several years of experience in the industry, I\'ve had the opportunity to work on diverse projects ranging from small business websites to large-scale enterprise applications.',
                section_tree: 'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring.'
            },
            experiences: {
                experience_one: {
                    title: 'Full Stack Developer',
                    company: 'EticSoft A.Ş.',
                    date: 'January 2020 - Present',
                    description: 'Developed and maintained full-stack applications using React, Laravel and PostgreSQL.'
                },
                experience_two: {
                    title: 'Full Stack Developer',
                    company: 'Freelancer',
                    date: 'January 2018 - December 2020',
                    description: 'I\'m a freelancer and I work on projects that I\'m interested in.'
                },
            }
        },
        contact: {
            title: 'Contact Me',
            description: 'Feel free to reach out to me for any questions or opportunities!',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send Message'
        },
        blogs: {
            meta: {
                title: "Blogs",
                description: "",
                keywords: "",
            },
            title: "Blogs",
            description: "I write about my experiences and thoughts about web development, programming, and technology.",
            search_placeholder: 'Search...',
            read_more: 'Read More',
            all_posts: 'All Posts',
            no_results: {
                title: "Not Found",
                description: "The page you are looking for could not be found.",
            }
        },
        blog_post: {
            meta: {
                title: "{{val, string}} - Blog Post ",
                description: "",
                keywords: "",
            },
            back_to_blogs: 'Back to Blogs',
            share: 'Share',
            previous: "<p class='!p-0 !m-0 !-mb-1'>Previous Post</p><p class='!p-0 !m-0 !-mb-1'>{{val, string}}</p>",
            next: "<p class='!p-0 !m-0'>Next Post</p><p class='!p-0 !m-0'>{{val, string}}</p>",
        },
        contact: {
            meta: {
                title: "Contact",
                description: "Contact Us Me"
            },
            title: "Let's Connect",
            sub_title: "I'm always interested in hearing about new opportunities, collaborations, or just having a friendly chat about technology and development.",
            cards: {
                email: {
                    title: "Email",
                },
                location: {
                    title: "Location",
                },
                availability: {
                    title: "Availability",
                    sub_title: "Open to opportunities"
                }
            },
            socials_title: "Connect with Me"
        }
    }
}