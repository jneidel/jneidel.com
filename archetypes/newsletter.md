---
title: "{{ replace .File.ContentBaseName "-" " " | replaceRE "^[0-9]+ " "" | title }}"
description: ""
summary: ""
tags:
date: {{ .Date | dateFormat "2006-01-02" }}
slug: "{{ replaceRE "^[0-9]+-" "" .File.ContentBaseName }}"
thumbnailAlt:
draft: true
writingTime:
---

<++>
