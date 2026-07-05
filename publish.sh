rm -rf .output

bun run build
bun run wxt zip

bun run build:firefox
bun run wxt zip -b firefox

bun run wxt submit \
            --chrome-zip .output/*-chrome.zip \
            --firefox-zip .output/*-firefox.zip --firefox-sources-zip .output/*-sources.zip \
            --edge-zip .output/*-chrome.zip
