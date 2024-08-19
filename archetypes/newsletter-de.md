---
title: "Newsletter #{{ replace .File.ContentBaseName "-" " " | replaceRE "^[0-9]+ " "" | title }}: <++>"
description: ""
summary: ""
tags:
date: {{ .Date | dateFormat "2006-01-02" }}
slug: ""
thumbnailAlt:
draft: true
writingTime:
---

<++>

## Letzte Challenge

Siehe [Challenge Beschreibung](newsletter/{{ replace .File.ContentBaseName "-" " " | replaceRE "^[0-9]+ " "" }}).

<++>

## Nächste Challenge

<++>

## Neue Artikel

<++>
