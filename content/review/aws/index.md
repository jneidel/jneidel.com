---
title: "AWS Review: Low-cost vs high-cost providers"
description: "My experiences and problems using AWS as an individual. Comparison of the immaterial costs and ROI calculation."
summary: "The cheapest option is costing you."
tags:
    - "service review"
    - "not recommended"
date: 2024-07-10
thumbnailAlt: "Close-up of a server rack"
writingTime: 222
---

I've tried to keep this review non-technical.
The discussion is relevant not just to AWS, but to other low-cost providers
like it.
The hidden costs need to be considered.
Especially compared to a more pricey option.

## What is AWS?

Amazon Web Services provides computing resources.
They want to differentiate themselves on price.
You only pay for what you use.
They are the cheapest available option in some categories.

## My usage

I only intended to use AWS on a small scale.
A few things here and there.
Hosting _parts_ of a project.

I didn't do any training.
I just logged into the platform and clicked around.

If you don't care about the technical details of what I tried to do with
AWS, [skip straight to the problems](#problems).

### Storage

An [app](https://github.com/jneidel/keystone-demo) I was demoing needed some storage.
Looking up S3 and clicking my way through was simple enough.

It stopped being simple at the bucket policy.
They wouldn't generate it, so I had to paste in some everything-is-allowed
configuration from the internet to get it to work.

I had no interest in understanding or securing the policy.
Authentication and the like.
That seems really painful.

### Host a dockerized app

I had a docker compose app I wanted to be available 24/7.

I thought "how complicated could it be" and grabbed a guide.
After clicking my way through a bunch of modules, setting up a RDS, EC2,
Firewall, Internet Gateway, etc. I concluded that I would not be able to
make it work.
The app was constantly crashing and not reachable from the outside.
Debugging experience was horrible.

### Send Email

I wanted to send an email newsletter for this website.
At 1$ per 10.000 emails SES is the undefeated price leader[^10kemail].

I had configured Sendgrid some weeks before for a different project.
That was super easy.
SES was not.

I could not just send a test email to my own email, I could only trigger an
internal test case.
You can't do anything without production access, for which you need to
apply.
My experience with that and some other little issues are described below in
[little annoyances](#little-annoyances).

[^10kemail]: At [Postmark](https://postmarkapp.com/pricing) it's 15$ per 10k emails.
At scale this get cheaper, but AWS is just unbeatable.
With Postmark it's still 6.95$ per 10k, even if you send 1 Million emails.

## Problems

I found there to be a lot of things wrong with AWS.
I cannot say, that the same is true of all low-cost providers.
But, I would expect higher-cost providers to do better than this.

### User experience

I know computers.
I can work navigate around a new website fine.

I could not complete any task without getting help from the internet.
Sure I could go in and delete something.
But I wouldn't know if that deleted everything (the answer is No.)
I could create something, but it wouldn't work.
Least of all could I understand how things worked.

There is technical mumbo-jumbo everywhere.
Everything has arcane names and tons of options.
You have to select the right region to see anything.
Important points are hidden away in a menu somewhere.

At no point was navigating the site ever easy, enjoyable or even just
bearable.
Every login I knew "this is gonna suck."

### Cost management

At no point did I know what costs I would incur as the consequence of my
actions.
You won't know what is or is not covered by the free tier.
You won't know if it cost you anything until you get the invoice.

Not that you can understand the invoice.
Nothing is clickable.
Good luck figuring out by yourself which component and what inside of it is
creating these charges.

It took me three months to figure out what I was even being charged for.
Each time removing the things that I thought to be causing the costs.
Only with multiple searches and ChatGPT debugging did I finally get it.
Well, I don't know if I got it, I'll have to wait until for the next invoice
to be sure :weary:

{{<figure src="./cost-overview.png" class="w-11/12" alt="Unclickable AWS Cost Explorer" caption="Just let me click on it and disable what is causing the charge.">}}

### Dishonesty

The cost management design described above is clearly flawed from a user
perspective.
Generally flaws can either be attributed to incompetence or malice.

As far as people are concerned, it is generally a good idea to assume
incompetence rather than malice.
Makes it easier to work with them.

AWS can not claim incompetence.
The cost management is a critical part of a huge operation.
AWS cross-finances Amazons money-loosing ventures.
It's Amazons golden goose.

They would remedy this if they wanted to.
They don't want to.
The flaws serve them.
That make the intention behind it malice.

For their own benefit, they are screwing over the user intentionally.
AWS knows that people are paying for stuff they don't want, for resources
they are having a hard time getting rid off.
AWS knows what they are doing.
They are bad faith actors.

### Complexity

<abbr title="Keep it simple, stupid">KISS</abbr> is a foreign concept to the
AWS people.
Everything. Is. So. Complicated.
The site is just not understandable without training.

I get it.
You're trying to sell to enterprise customers.
They demand full customizability on everything.
And they can pay their employees for hours and hours of training and
performing BS tasks.

### Little annoyances

- AWS Email: "We have received your support ticket."
- I close the tab because I assume they will now process it.
- AWS Email: "Actually you're not done.
Answer all of these questions.
If you don't we'll just close this ticket."
- I have to go back to copy-paste my answers.

You already asked me to fill out a bunch of stuff.
Why do you ask for more details right after?
You haven't even looked at my responses.

> Your DNS records for the DKIM setup are no longer present.[^DKIM]

[^DKIM]: Technical mumbo-jumbo. I did know what DKIM was before this message
either. I would have been fine not knowing.

Ok, but I didn't change anything.
I checked and far as I can see my DNS records are still correct.
Must be their mistake.
5 days pass.
"We are now disabling DKIM."

It is their mistake, but it is my problem to clean up :weary:

## Pareto & ROIs

After what I have seen from AWS, I would categorize them in the 20% of
services that create 80% of the headaches for me.
I know, that if I stay with them, there is gonna be one issue after the other.
Random things break, "you need a dedicated IP," undecipherable costs, etc.
Headaches I don't want to deal with.

### ROI comparison

For my emails I've decided to go with [Postmark](https://postmarkapp.com) over AWS.
Here are the return on investment (ROI) calculations underlying that decision:

#### AWS investment
- 1$/10.000 emails
- effort to setup in their complex system
- waiting times to be unlocked for production access
- effort to solve problems by myself (support will treat me like a tiny
fish, since I'm not an enterprise customer)
- effort to deal with the [little annoyances](#little-annoyances)
- effort to double check to see how AWS will screw me over (cf. [bad faith actor](#dishonesty))
- uncertainty about invoicing and hidden costs
- uncertainty about deliverability and associated costs
- I feel miserable when using the website

#### AWS returns
- emails are delivered

#### Postmark investment
- 15$/10.000 emails
- effort to setup (minimal)

#### Postmark returns
- emails are delivered
- certainty that I'm getting the best deliverability out of the box
- certainty that there are no hidden or future costs
- certainty that the support will be there if I need it
- the website is a joy to use

The way that I see it, is that Postmark beats out AWS here.
I see AWS with a huge list of investments and risks, most of which are
non-monetary, and delivering simply what is required.

Postmark I see as user-focused, concious of the costs they are creating for
me and delivering a much superior experience.

The way that you feel while using the service is not to be understated.
That can be a big part of the returns/costs.

## Conclusions

AWS and similar low-cost providers cost us in non-material ways.
If you take into account the immaterial costs and benefits, a competitor
charging a higher dollar amount might not look so bad.

If you value your own time, use services that also value your time.
AWS is not one of them.

Personally I will pay somebody else more money to get a website that makes
things easy for me and is a joy to use.
