SHELL = /bin/bash

.PHONY:
.ONESHELL:
dist:
	rm *.zip; zip -r gahnoo-linux.zip $$(git ls-files)
