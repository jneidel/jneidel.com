---
title: "Migrating the technical documentation of a legacy project to Arc42"
description: "What is arc42 and how did we use it to improve the technical documentation for our project? This is how we implemented it."
summary: "Overhaul of our project technical documentation."
date: 2024-12-31
thumbnailAlt: "Blue-gray PHP Elefant (ElePHPant) surrounded by pages of documentation"
slug: "technical-documentation-with-arc42"
---

This article will give a rough overview of how I introduced structured
technical documentation to our project as a regular developer.
You should walk away with a good understanding of how to pitch your
stakeholders and how to see the implementation through.

This is not meant as a step-by-step guide, but as a description of what we
went through, so that it might serve as an example for you.
It might give you a better idea of the work that would be involved to
implement something similar in your own project.

## More on the project

I work on a 9 year old PHP project.
It has three smaller scrum teams on it.
The project used to be on a fixed-price contract, but is not anymore.
We actively work on maintenance: refactorings to increase the PHP version,
performance improvements, increasing test coverage and much more.

**Status quo**

This is where we were at in terms of documentation:
We had some technical documentation, which was scattered around in multiple
locations (in git, confluence, meeting recordings.)
It was incomplete, unstructured, not so easily unsearchable and outdated
(by up-to 8 years in some places.)
Developers rarely created new documentation.
If they did, they would not know where to put it (they just chose what
seemed like the right place.)
There were no processes for reviewing new and updating existing
documentation.

## Motivation

After that description of the status quo, it should be pretty clear why we,
the developers, want a proper system for our documentation.
But why should the company invest into it?
Here are the main arguments that applied to our case.

### ROI for the company

**Save money onboarding new developers.**
<br>
Before: You have hours and hours of meetings, where you pay for the time of
everybody involved.
<br>
After: The person being onboarded reads the technical documentation and
gains an overview and a detailed understanding of the system.

**Protect yourself from a catastrophic loss of business and domain knowledge
when a key person leaves.**
<br>
Any time only one person has deep knowledge of something you're at a risk of
losing that knowledge for one of many conceivable reasons: The person has an
accident, quits, becomes unwilling to share it, etc.
Can you afford that loss?

**Save money by speeding up development.**
<br>
In large systems or with new people there will always be areas a developer
is unfamiliar with.
Being able to familiarize yourself quickly with the part of the system
you're supposed to work on and having all your questions answered, which would
otherwise need digging, can save a lot of time and frustration.
This become more complicated as the system grows larger.

## Requirements

Ok, so we want better technical documentation.
What would it look like in a perfect world?

The ideal documentation would be:
- all in one place
- easily searchable
- structured in a way that makes sense
- everything has a clear place (can be deducted by reason)
- up-to-date
- complete to the degree of detail needed
- reviewed by the team
- integrated into other processes
- everybody has access

## arc42

Part of the requirements just laid out necessitate a structure to the
information.
One can come up with their own, but I looked into [arc42] and was convinced
that this would be better and quicker than rolling my own.

### What is arc42?

[arc42] is a way to structure technical documentation.
It provides you twelve logical buckets (sections) for your documentation.
Every piece of information you have goes into one of the twelve sections.
Thus, arc42 makes it clear where to read some information and where to add
information.

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
(neighboring systems and users). From a business/domain perspective.
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

Arc42 elegantly solves a part of the puzzle.
It provides a structural foundation that is a complex as you need it to be
and flexible enough for our customization.
It is also not bound to any specific platform.

## Implementation

Above we defined a proposal ([requirements](#requirements), [ROI](#roi-for-the-company), [some details](#arc42)).
How did I take this proposal and made it a reality inside of the project?

While this whole article is very structured and linear, the real
implementation was messy.
My thinking evolved over time as the proposal grew, through discussion and
negotiation with relevant stakeholders.
What you read is the clearest version, written with the benefit of
hindsight.

### Talking to stakeholders

The first step was to gather more information and get the buy-in from the
stakeholders, who would effected by the change.

Below are the people I brought the proposal to.
Throughout, I continuously improved the proposal, adjusted it to newly
discovered [requirements](#requirements) and made it more concrete.

- **Tech Lead**<br>
In our 1-on-1 we discussed the feasibility (timing, scope, ROI) of the
proposal and the solution itself.
- **Developers**<br>
In one of our bi-weekly meetings I presented the proposal to the whole
group, collected feedback and held a vote on contentious design decisions.
I incorporated their suggestions and got their OK.
- **PM/PO** (Client stand-in)<br>
With the developers behind me, I brought this to my PO/PM.
They welcomed the (at this point) well thought-out maintenance initiative
and brought it to the client for approval.

After getting approval and me writing the Jira tickets, it was up to the PMs
to schedule the epic.
It would be a few months before I could continue.

#### Agreed upon implementation

We landed on:
- arc42 as the structural framework
- GitLab as the place for the documentation

<details>
<summary>Finding a place for the documentation</summary>

Among the developers we had a debate about where and how the documentation
would be stored.
The options we considered were:
1. Confluence
2. GitLab (in monorepo or in separate repo?)

Besides providing search, the individual pros for the platforms were:

**Conflunence pros:**
- PO/QA documentation is already there. The projects documentation would be
all in one place.
- Everybody (including externals) already has access.
- A few diagrams can be created in Confluence.

**GitLab pros:**
- Devs and many more already have access and it can be easily provided.
- Many types of diagrams can be done with [mermaid] and remain easily
adjustable.
- Easily integrates into the existing review process.
- Developers don't have to leave their dev environment to write
documentation. It's not a separate process.
- Documentation can be submitted alongside relevant code changes.
- Written in the ubiquitous markdown format (not whatever Confluence uses.)
- URLs are static and reliable, based on filenames not titles (Confluence
URLs are based on the title of the page, i.e. they will change dynamically.)
- Can be browsed locally and offline.

To simplify code review we decided to include the technical documentation in
the monorepo.

</details>

### Structuring and migration

This part made up the main body of work.
Applying the structure of arc42 to our project and migrating in anything and
everything that already existed in terms of technical documentation.

#### Gathering existing documentation

We had documentation spread around a few different places:
- multiple sections, with many pages across our Confluence
- markdown files in the git
- sections in the main README.md
- onboarding videos in Sharepoint

I extracted everything and put it in my note-taking system.
Skimming the notes, I grouped them into rough buckets (e.g. architecture,
deployment, by feature/component, etc.), while also filtering out the
irrelevant and outdated.

#### Grouping into sections

[Arc42](#arc42) provides well-defined sections for structuring your documentation.
(See [the overview](#the-sections-in-more-details) for a list.)
Now it was the time to go through the sections one-by-one and for each:
- write an introduction (if necessary)
- migrate the contents of relevant notes into that section
- gather information to complete or update parts (where necessary)
- describe missing aspects (if too large a task, I created a ticket with
detailed expectations and questions I expected to be answered)
- have it reviewed by colleagues and revise where necessary

With that the new technical documentation stood.

#### Cleanup and post-processing

The source of the migrated data should be cleaned up.
I marked the old confluence pages as deprecated with a big notice at the top
and a link to the new documentation.
Content deletion or moving it into a dedicated space would also be
possibilities.

I presented the technical documentation to the team and directed them toward
creating new documentation inside of the new structure.
Any new documentation that was created in the meantime I migrated or wrote a
ticket for.

### Processes and future work

Part of the [requirements](#requirements) is to keep the docs up-to-date and
this can only be achieved through integration into our processes.
Without that it would soon become just another outdated dump.

#### Measures we put into place

- New technical documentation is to be created within the newly created
structure.
- New components and features need to be described (to some extent.)
- Architecture decisions need to be described as ADRs[^adr].
- Changes to existing component need to be reflected in the existing
documentation.

These expectations were described in the contribution guidelines and
communicated to the developers.

### Concrete details

The above was intentionally light on concrete, technical details of our
implementation.
I have them collected here in one place for those who are interested.

<details>
<summary>Show details</summary>

- All files related to technical documentation live inside of the main
GitLab monorepo under `docs/`.
- As part of the main repo: Any change to the documentation follows the
normal review process (looked into by at least two other devs.)
- Each arc42 section is it's own markdown file.
    + `docs/1. Introduction and Goals.md`, etc.
- `docs/README.md` contains a list of links to all sections.
GitLab directly renders this list as a convenient overview if you click into
the `docs` directory on the web.
- Diagrams are preferably included as [mermaid] source code inside of
a `mermaid` code block, which GitLab (and GitHub) renders as an inline diagram.
- Source code is directly linked to, instead of being verbosely quoted:
`[Abc](../src/Abc.php)`.
- You can make the GitLab docs searchable through a custom [bang](https://duckduckgo.com/bangs):
In your browser settings you add it here:
{{<figure src="./bang-setup.png" class="w-12/12" alt="Configuring a custom bang for tech documentation">}}
The URL with %s looks something like this: `GITLAB_HOST/search?group_id=379&nav_source=navbar&project_id=236&repository_ref=docu&scope=blobs&search=+path%3Adocs+%s&search_code=true`<br><br>
Then you can search for e.g. `!docs block`:
{{<figure src="./bang-1.png" class="w-10/12" alt="!docs">}}
This turns into:
{{<figure src="./bang-2.png" class="w-10/12" alt="!docs block">}}
It will direct you to the result in GitLab:
{{<figure src="./bang-result.png" class="w-11/12" alt="GitLab showing results for search">}}

</details>

## Conclusions

For our project it was well worth investing in proper technical
documentation.
[Arc42](#arc42) was a major help in this endeavor.

[mermaid]: https://mermaid.js.org
[arc42]: https://arc42.org/overview
[^adr]: An Architecture Decision Record describes the reason behind
important (architecture) decisions inside of the project. This is so
that if the team in the future wants to change the something they can
understand why in the past it was designed like that. ADRs are part of
section 9: Architecture Decisions.
