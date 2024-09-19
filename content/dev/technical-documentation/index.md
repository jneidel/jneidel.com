---
title: "Migrating a legacy projects technical documentation to Arc42"
description: "Creating technical documentation for a legacy project with Arc42"
summary: ""
tags:
date: 2024-08-27
thumbnailAlt: "Blue-gray PHP Elefant (ElePHPant) surrounded by pages of documentation"
slug: "technical-documentation-with-arc42"
draft: true
---
<!-- writingTime: 217 -->

_little intro here_

## Status quo

I work on an 9 year old PHP project with three smaller scrum teams on it.
This is where we were at:
We had some technical documentation, which was scattered around.
It was incomplete, unstructured, not so easily unsearchable and outdated, by 8
years in places 😆.
Developers rarely created new documentation.
If they did, they would not know where to put it (they just chose a place.)
There was no review process and little updating of existing docs.

## Motivation

Why did we want to invest in improving documentation?

The problem descriptions above should have given you some idea to the value
of having a structured approach to documentation.

### ROI

As a consequence the company would:

You save money on onboardings.
Before: You have hours and hours of meetings, where you pay for the time of
everybody involved.
After: The person being onboarded reads the technical documentation and
gains an overview and a detailed understanding of the system.

You protect yourself from catastrophic losses of business and domain
knowledge when a key person leaves.
Any time only one person has deep knowledge of something you're at a risk of
losing that knowledge one of many reasons: has an accident, quits, becomes
unwilling to share it, etc.
Can you afford that loss?

You save money by speeding up development time.
In large systems or with new people there will be areas a developer is
unfamiliar with.
Being able to familiarize yourself quickly with the part you're supposed to
work on and having all your questions answered that would otherwise need
digging can save a lot of time and frustration.
Especially as the problems become more complicated and the system grows
larger.

(Git, Confluence, Meeting recordings)

## Defining the goal

The ideal documentation would be:
- easily searchable
- structured and clear in what belongs where
- up-to-date
- complete to the degree of detail needed
- reviewed by the team
- integrated into other processes
- all in one place
- everybody has access

## Solution approach: arc42

### What is arc42?

In arc42 every piece of information belong in one of the twelve sections.

#### The sections in more details
<details>
<summary class="cursor-pointer">Expand</summary>

1. **Introduction and Goals**<br>
Short description of the product requirements, quality goals and
stakeholders.
2. **Constraints**<br>
Anything that constraints decisions about design, implementation and
processes.
3. **Context and Scope**<br>
Delimits your system from its (external) communication partners
(neighboring systems and users). From a bussiness/domain perspective.
4. **Solution Strategy**<br>
Summary of the fundamental decisions and solution strategies that shape
the architecture.
5. **Building Block View**<br>
Static decomposition of the system across multiple levels of abstraction.
6. **Runtime View**<br>
Behavior of building blocks as scenarios, covering important use cases or
features and interactions at critical external interfaces.
7. **Deployment View**<br>
Technical infrastructure with environments and topologies. Mapping of
(software) building blocks to infrastructure elements.
8. **Crosscutting Concepts**<br>
Overall solution approaches relevant in multiple parts of the system.
9. **Architectural Decisions**<br>
Important architecture decisions including their rationales.
10. **Quality Requirements**<br>
Quality requirements as scenarios.
11. **Risks and Technical Debt**<br>
Known technical risks or technical debt. What potential problems exist
within or around the system? What does the development team feel miserable
about?
12. **Glossary**<br>
Important domain and technical terms that stakeholders use when discussing
the system.

Visit [arc42]s website for more detail and examples of what a section might
look like.
</details>

### Why we chose arc42

## Implementation

The previous sections described how I thought about our requirements for
documentation and arrived at the decision to use arc42.
Of course my thinking at the time was not as fully realized as the above.
The proposal grew over time, through discussion and negotiation with
relevant stakeholders.

This next section will describe how I took this proposal and made it a
reality inside of the project.
It's not meant as a step-by-step guide for you to follow, but as a
description of what we went through that might serve as an example for you.
It might give you a better idea of the work that this project could involve.

### Talking to stakeholders

The first step was to gather more information and get the buy-in from the
stakeholders who would effected by this change.

Below are the people I brought the proposal to.
Throughout, I continuously improved the proposal, adjusted it to newly
discovered requirements and made it more concrete.

- Tech Lead<br>
In our 1-on-1 we discussed the feasibility (timing, scope, ROI) of the
project and the solution itself.
- Developers<br>
In one of our bi-weekly meetings I presented the proposal to the whole
group, collected feedback and held votes on contentious design decisions.
I gave them an update after I incorporated their comments and got their
OK.
- PM/PO/Client<br>
With the developers behind me I brought this to my PO/PM, who welcomed the
maintenance initiative and brought it to the client.

After getting approval and writing the Jira tickets, it was up to the PMs to
schedule the epic.
It would be a few months before I could continue.

#### Agreed upon implementation

We landed on:
- arc42 as the model for the structure
- GitLab as the place for the documentation

#### GitLab vs. Confluence

Among the developers we had a debate about the platform to use.
Besides providing search, the individuals pros were:

**Conflunence pros:**
- PO/QA documentation is already there. The project documentation would be
all in one place.
- Everybody (including externals) already has access.
- A few diagrams can be created in Confluence.

**GitLab pros:**
- Devs and many more already have access and it can be easily provided.
- Many types of diagrams can be done with [mermaid] and remain easily
adjustable.
- Easily integrates into the existing review process.
- Developers don't have to leave their dev environment to write
documentation. It's not such a separate process.
- Documentation can be submitted alongside code.
- Written in the ubiquitous markdown format.
- Urls are static and reliable, based on filenames not titles.
- Can be browsed locally and offline.

### Structuring and migration

This part made up the main body of work.
Applying the structure of arc42 to our project and migrating in anything and
everything that already exists in terms of technical documentation.

#### Gathering existing documentation

We had documentation spread around a few different places:
- multiple sections across our Confluence
- markdown files in the GitLab
- sections in the main README.md
- onboarding videos in Sharepoint

I extracted everything and put it in my note-taking system.
Skimming the notes, I grouped them into rough buckets (e.g. architecture,
deployment, by feature/component, etc.), while also filtering out the
irrelevant and outdated.

#### Into sections

Arc42 provides well-defined sections for structuring your documentation.
See [the overview](#the-sections-in-more-details) for a list.
Now it was the time to go through the sections one-by-one and for each:
- write an introduction (if necessary)
- migrate the contents of relevant notes into that section
- gather information to complete or update parts (where necessary)
- describe missing aspects (if too large a task, create a ticket with
detailed expectations instead)
- have it reviewed by colleagues and revise where necessary

With that the new technical documentation stood.
But simply creating it isn't all there is to it.

#### Cleanup

The source of the migrated data should be cleaned up.
I marked the old confluence pages as deprecated with a big notice at the top
and a link to the new documentation.
Content deletion or moving it into a dedicated space would also be
possibilities.

While I marked pages a deprecated I found a few new ones!
They had been created while I wrote the new structure 🙂.
It happens.
I let the team know to please use the newly merged structure from now on.

### Processes and future work

Without integrating this new shiny documentation into our existing processes
it would soon just become another dump.
The [goals](#defining-the-goal) depend on some amount of continous being
expended to keep the docs up-to-date and relevant.

#### Measures we put into place
- New technical documentation is to be created within the newly created
structure.
- New components and features need to be described to some extent.
- Architecture descision need to be described as ADRs[^adr].

These measures were described in the contribution guidelines and
communicated to the developers.
I did an explaination of ADR concept and handed each developer a recent
decision to write a record about.

#### Are we done?

Everything we had was or is in the process of being migrated over into the
structure.
There are still some big holes we need to fill.
Mostly components.
I wrote detailed tickets about the most important ones during the
structuring and we are tackeling them over time.

The overhaul of the API documentation is another project.

### Concrete details

Here are all the concrete implementation details collected in one place:

- All files related to technical documentation live inside of the main
GitLab mono-repo under `docs/`.
- As part of the main repo: Any change to the documentation follows the
normal review process (looked into by at least two other devs.)
- Each arc42 section is it's own markdown file.
    + `docs/1. Introduction and Goals.md`, etc.
- `docs/README.md` contains a list of links to all sections.
GitLab renders this list as a convenient overview when browsing the
directory.
- All diagrams are preferably included as [mermaid].
source code inside of markdown in a mermaid code block.
GitLab then renders the diagrams.
- Source code is directly linked to, instead of being verbosely quoted:
`[Abc](../src/Abc.php)`.

## Conclusions



[mermaid]: https://mermaid.js.org
[arc42]: https://arc42.org/overview
[^adr]: An Architecture Decision Record describes the reason behind
important (architecture) decisions inside of the project. This is so
that if the team in the future wants to change the something they can
understand why in the past it was designed like that. ADRs are part of
section 9: Architecture Decisions.
