

## Install Microsoft Clarity

Add the Clarity tracking script (project ID: `vtl0nas964`) to `index.html` in the `<head>` section, alongside the existing Meta Pixel setup.

### Change: `index.html`
Insert the Clarity snippet right before the closing `</head>` tag:

```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "vtl0nas964");
</script>
```

Single file change, no other modifications needed.

