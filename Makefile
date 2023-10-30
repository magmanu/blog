draft:
	echo "Creating draft for $(slug)"
	mkdir ./drafts/$(slug)
	cp ./templates/draft.md ./drafts/$(slug)/index.md
	sed -i "" "s/draft-slug/$(slug)/g" ./drafts/$(slug)/index.md
	# double quotes are needed for sed to work on macos

post:
	echo "Publishing $(slug) to $(blog)"
	mkdir -p ./my-website/$(blog)/$(shell date +"%Y-%m-%-d")-$(slug)
	cp ./drafts/$(slug)/index.md ./my-website/$(blog)/$(shell date +"%Y-%m-%-d")-$(slug)/index.md
	rm -rf ./drafts/$(slug)

preview:
	cd ./my-website && npm run build && npm run serve

translateUI:
	cd ./my-website && npm run write-translations -- --locale pt-BR

translateBR:
	cp -rv my-website/$(blog)/$(folder) my-website/i18n/pt-BR/docusaurus-plugin-content-blog-$(blog)/$(folder)
