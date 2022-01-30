---
template: post
title: Things I learned in 2021
slug: learn-2021
draft: false
date: 2022-01-29T18:13:34.496Z
description: About what I learned in 2021.
category: Blog
tags:
  - open source
  - typescript
  - css
  - rust
  - wireshark
  - nextjs
  - ctf
  - web security
  - aws
---

At the beginning of 2021, I knew that I’m in the middle of Valley of Despair of the [Dunning-Kruger Effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect). I also realized that I was having a lot of gaps in my knowledge. So I forced myself to learn and practice harder than previous years to fill these holes. In this post, I want to share something that I did and learned through the year, with some context on each item. I think it’s good for me to look back, and it also helps me to plan better this year (2022). And the next reason is that I love sharing 😬

![Dunning-Kruger Effect](/media/2021/dunningkruger.png)

## Updated my open source library to version 2.0.0 and got ~4000 downloads per week

![linked in package](/media/2021/package.png)

I did release an [open source package](https://www.npmjs.com/package/react-linkedin-login-oauth2) 4 years ago (2018). It basically helps you to integrate the Login with Linkedin feature to a React application easily. When I start this, I just do it for fun and thought no one was gonna use this library. But after a long time, I see that there are some people who actually installed my package. I also received bug reports and feature requests. (All of that happens without zero advertising). I decided to spend some weekends working on this little project. People started to thank me for helping them. I felt wonderful that my work can save some people’s time. I also learned a lot (I will write a post on what I learned when doing open source). I realized that I actually received more than I gave to the community.
In October, I wanted to [release the package to version 2.x](https://github.com/nvh95/react-linkedin-login-oauth2/pull/50) to tackle some major problems in version 1.x. I learned a lot. I converted my code to Typescript, I learned more about Typescript. I used Rollup to bundle my code instead of webpack to support [ECMAScript modules](https://nodejs.org/api/esm.html), to leverage the [Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) feature. For the first time, I knew about Vite, and use it for the example while developing the package. I had so much fun working on these items and learn so much. After investing some time in the project, I see the strike in the number of weekly downloads that amazed me. It reached about 4000 downloads per week. There are many things to do for this little project and I hope I can make it better in 2022.

## Participated more actively in the open source world

![opensource](/media/2021/opensource.png)

I love open source. I use open source software every-single-day. I use React, Node.js, VS Code and many many other things. I think open source plays a big role in bringing humanity this far. The good thing about open source is that everyone can make their lives and others’ lives much easier and more enjoyable. Anyone can contribute to the open source. It does not require you have to write code to core services of a framework or application. It can be anything, from a typo to the recommendations, the feedback about the software. This year, besides using open source software, I started to give back the community by contributing commits, participating discussions, answering questions, sharing my solutions to the problem I couldn't google. I feel great and I did learn a ton. Next year, I target to contribute more to some projects that I like and am interested like msw and Next.js.

## Adopt Typescript

![Typescript](/media/2021/typescript.png)

I worked with Javascript every day for more than 4 years. You might heard “Javascript is great”. Yeah, I love it. You might hear “Javascript is terrible”. Well, I... don’t disagree. I knew the good and the bad things about javascript but I still love it overall. It gives me flexibility, but also gives me “Cannot read properties of undefined” 😂. Until one day, Microsoft introduced Typescript. I heard about it and thought: “Ok, javascript with types, just another tech. No thanks, I’m good with pure javascript”. But a few months ago, I decided to experiment Typescript for a greenfield project at my company. My teammates and I were amazed by how Typescript helps us improve the quality of our code and catch almost all the potential bugs early. Most important, Typescript gives us a high level of confidence to ship our code to production. Typescript also gives Github Copilot a lot of context, so Copilot can be really helpful on giving suggestions. I have much fun working with both Typescript and Copilot. Typescript is not just a “type system” as I imagined before. It’s truly your best sidekick.

## Study CSS

![CSS](/media/2021/css.jpeg)

It sounds ridiculous when I was a frontend engineer for more than 4 years but still needs to learn CSS. You are correct, I learned it from scratch, not googled some weird issues we all encounter in our everyday jobs. Previously, in my company, frontend engineers don’t really need to style. We are given CSS from CSS Engineers. Our main duty is to handle and implement the business logic, writing tests, etc... In the past, I did not consider myself a true frontend engineer.

Luckily, last year I found Josh Comeau’s [css-for-js course](https://css-for-js.dev/). It’s not only the best CSS resource I’ve ever seen, it’s also one of the best courses I’ve learned. The way he organizes CSS knowledge unit with the approach of practice-first is effective and I had a lot of joy learning CSS. After the course, I gain in depth knowledge of CSS such as the box model, flow layout, flexbox, grid, responsive, modern CSS architecture, animation and the most important, the solid CSS foundation that I can explore my CSS journey by myself. Now, I am very comfortable building any UI I see on the internet and it boosts my productivity by at least 50%. I am no longer dependent on CSS Engineer and feel much enjoyable when working with UI.

## Start to explore Rust

![Crab](/media/2021/rust.jpeg)

Rust is an interesting programming language that promotes safety and high performance. It isn’t like any other programming languages that you can pick up the syntax then use your knowledge of other programming language on it. Rust introduces the concept of Ownership, remove the necessity of garbage collector. People in the frontend world are building tools written in low level programming languages (including Rust) to reduce run time significantly. Rust can also be used to write code for [WebAssembly](https://webassembly.org/), which is a super cool technology, used for super cool product like [Figma](https://www.figma.com/). I don’t want to stay out of this move of the technology world, so I decided to dip my toes in the Rust world. I just began my journey with Rust by reading [The Book](https://doc.rust-lang.org/book/title-page.html). I hope I will have a good time with Rust in 2022.

## (Re)Learn Computer Network with Wireshark

![network cable](/media/2021/network.jpeg)

Having a Bachelor of Computer Science, I think everyone knows about Network, OSI model, DNS, HTTP/ HTTPS... I also do, but that’s it, I forgot a lot after I graduated (sorry my teacher 🙏😥). My everyday work is mainly on the application layer. But it helps to understand deeply how computer network works at the zero and one level. I took the course [Analyzing Network Protocols with Wireshark](https://app.pluralsight.com/library/courses/wireshark-analyzing-network-protocols) and this quick course helped me recall much knowledge about common protocols such as UDP, TCP, TLS, IPv4, IPv6, DNS, ARP, ICMP, DHCP, FTP... It also equips me with the skill of using Wireshark to understand how those protocols actually work. This skill actually helps me solve some hard problems in my daily work.

## Get familiar Next.js

![nextjs framework](/media/2021/nextjs.png)

I heard a about [Next.js](https://nextjs.org/) for quite a long time, especially when some of my users on [react-linkedin-login-oauth2](https://www.npmjs.com/package/react-linkedin-login-oauth2) submitted [issues](https://github.com/nvh95/react-linkedin-login-oauth2/issues?q=is%3Aissue+next) related to Next.js. In the React world, [Create React App](https://create-react-app.dev/) (CRA) used to be a de facto solution to bootstrap a react application. But I learned that [CRA was put in the maintenance mode](https://github.com/facebook/create-react-app/discussions/11768). CRA was born to have a purpose of leading the ecosystem and it served well. Now it’s time for other frameworks to make the react world grows such as [Gatsby](https://www.gatsbyjs.com/), [Vite](https://vitejs.dev/), [Next.js](https://nextjs.org/), [Hydrogen](https://hydrogen.shopify.dev/)...To adapt to the movement, I started to look into Next.js as a replacement for CRA. Many people think of Next.js as a framework of Server Side Rendering only. It used to be true but not anymore. Now it is suitable for Server Side Rendering, Static Site Generation, Client Only apps. I’m playing with Next.js by [migrating my blog to Next.js](https://github.com/nvh95/hung.dev/issues/29) and I have a lot of fun so far.

## Join the first CTF

![children playing capture the flag](/media/2021/ctf.jpeg)

CTF (Capture The Flag) is a security competition, participants are hackers, it’s not for someone who is not focused on security. That’s what I thought for almost ten years. Last year, one of my friends invited me to [a CTF for students in high school](https://junior.ctflag.asia/), organized by [CyberJutsu](https://cyberjutsu.io/) and [CyberKids](https://cyberkid.vn/). He persuaded me that it would be fun. It intrigued me and I accepted his invitation. I was surprised that CTF is not something “just for hackers” as I thought before. It’s all about things we already know, but do we actually understand them? All the challenges contain no new knowledge and concept, but the way those existing concepts combine and are being used smartly really dazzled me. I learned a lot from the competition and I have to look back seriously about what I thought that I already know and understand. After that, I also join 2 workshops hosted by CyberJutsu and learn much knowledge about computer security and exploit skills such as attacking using file, path traversal, template injection…

## Take Web Security course from Standford

![lock in the middle of keys of keyboard](/media/2021/security.jpeg)

Aside from joining a CTF, I also took [a course about Web Security](http://cs253.stanford.edu/). My daily job is developing a web application. Besides making software that helps my users on their jobs, I should also figure out how to protect them from the dangerous threads while they use my software. To achieve that goal, I need to understand basic and advanced web security concepts. I also need to know how to perform an attack, then I will be able to prevent them. Through the course, [Feross](https://twitter.com/feross) did a great job of guiding learners through these above items. The course helped me write a significantly better code than before.

## Shape the product that the market needs

![Product](/media/2021/product.png)

In the beginning years of my career, my everyday job is to receive a ticket, write the software following the requirements, test, write tests and deliver. But in recent years, I have chance to work closely with product team. I understand the reason for each ticket/ requirement. I understand the purpose of each line of my code to the company’s vision and strategy. I have a better view of a software product, from product and user perspective, not only from a technical perspective as before. I can make brainstorm ideas to build a feature, suggest product team about the pros and cons of each solution to a single problem. I can find the balance point between a business’s need and the system quality. Eventually, having users is more important than having a perfect technical system.

## Work as a backend engineer

![backend engineer](/media/2021/backend.png)

I am a fulltime frontend engineer since 2017. I forgot many things about database already 😅. Last year, I revised my understanding of backend systems and I was able to produce production code for backend side. I feel great to develop software both at frontend and backend sides. This year, I will keep sharpening my skills and hope to work more on the backend side, in addition to frontend work.

## Management skills

![team work](/media/2021/teamwork.jpeg)

Coding is hard. Making software is hard. But managing people is way harder. When developing software, our duty is to make the software do its job, also make the software better over time. Similarly, our duty when managing people is to help them finish their job well, also make them better every day. I learned a lot about these skills and there are many to improve in the next year.

## Get familiar with AWS

![cloud](/media/2021/cloud.jpeg)

We are living in a cloud era. The age of every company that needs to have a physical server is over. People are using cloud services like AWS, Microsoft Azure, Google Cloud Platform for their convenience, reasonable price, easy to scale. I don’t want to stay out of the trend so I started to research AWS lately. I target to have an [AWS Cloud Practioner](https://aws.amazon.com/certification/certified-cloud-practitioner/) in the next 3 months and [AWS Solution Architect](https://aws.amazon.com/certification/certified-solutions-architect-associate) in the next 6 months.

## Start to use twitter to learn

![blue bird](/media/2021/twitter.png)

I had a twitter account for a long time. But twitter is not very popular in my country, so I just do not use it. This year, I use twitter to follow some cool people in the technology industry, famous guys specializes in frontend in particular. I was surprised that I learned so much on twitter. I can see the current trending technology, also follow and participate in technical discussions with like-minded people. If you’re using twitter, [let’s connect with me](https://twitter.com/hung_dev). Following are some of my favorite resources which I knew through twitter:

- [Josh W Comeau’s blog](https://www.joshwcomeau.com/)
- [Lee Rob’s blog](https://leerob.io/)
- [LogRocket Podcast](https://podrocket.logrocket.com/)
- [Devtools.fm](https://devtools.fm/)

2021 is a very hard year for all of us. However, as Newton’s third law “to move forward, we have to leave something behind”, we are leaving the pandemic behind, please take care, and keep improving ourselves. I feel thankful for having a decent job during the pandemic, having a chance to learn something new every day and having many wonderful people around me supporting me to do this. Best wishes to all of my readers and I’m looking forward to seeing you again in 2022.
