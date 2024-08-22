---
title: "Newsletter #{{ .File.ContentBaseName }}: <++>"
description: ""
summary: ""
tags:
date: {{ .Date | dateFormat "2006-01-02" }}
slug: "{{ replaceRE "^[0-9]+-" "" .File.ContentBaseName }}"
thumbnailAlt:
draft: true
writingTime:
---

Hi :slightly_smiling_face:,
<++>

## Review of last challenge

- [Last week's challenge definition](newsletter/{{ sub (.File.ContentBaseName | int) 1 }}#next-challenge)

<++>

## Next challenge

<++>

## New articles

<++>
