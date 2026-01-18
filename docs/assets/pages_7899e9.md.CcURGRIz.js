import{_ as s,c as a,o as e,aM as p}from"./chunks/framework.DvFTVADX.js";const u=JSON.parse('{"title":"日记模板","description":"","frontmatter":{"UID":{"[object Object]":null},"aliases":null,"tags":["Diary"],"Type":"Diary","Year":{"[object Object]":null},"Month":{"[object Object]":null},"Date":{"[object Object]":null},"Time":{"[object Object]":null},"title":"日记模板","date":"2024-01-27T01:06:23.000Z","permalink":"/pages/7899e9/","categories":["template"]},"headers":[],"relativePath":"pages/7899e9.md","filePath":"100.script/日记模板.md","lastUpdated":null}'),l={name:"pages/7899e9.md"};function i(r,n,t,c,b,d){return e(),a("div",null,n[0]||(n[0]=[p(`<div style="display:none;" hidden="true" aria-hidden="true">Are you an LLM? You can read better optimized documentation at /100.script/日记模板.md for this page in Markdown format</div><h1 id="日记模板" tabindex="-1">日记模板 <a class="header-anchor" href="#日记模板" aria-label="Permalink to &quot;日记模板&quot;">​</a></h1><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> </span></span>
<span class="line"><span>北京天气</span></span>
<span class="line"><span>当前温度:27℃</span></span>
<span class="line"><span>天气:中雨</span></span>
<span class="line"><span>温度范围:26 ~ 34℃</span></span>
<span class="line"><span>湿度：77%</span></span>
<span class="line"><span>风向：北风 2级</span></span>
<span class="line"><span>紫外线：无</span></span>
<span class="line"><span>空气质量：优 PM: 22</span></span>
<span class="line"><span>日出: 05:14 日落: 19:27</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="今日任务" tabindex="-1">今日任务 <a class="header-anchor" href="#今日任务" aria-label="Permalink to &quot;今日任务&quot;">​</a></h2><h3 id="已完成任务" tabindex="-1">已完成任务 <a class="header-anchor" href="#已完成任务" aria-label="Permalink to &quot;已完成任务&quot;">​</a></h3><div class="language-dataviewjs vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dataviewjs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function callout(text, type) {</span></span>
<span class="line"><span>    const allText = \`&gt; [!\${type}]\\n\` + text;</span></span>
<span class="line"><span>    const lines = allText.split(&#39;\\n&#39;);</span></span>
<span class="line"><span>    return lines.join(&#39;\\n&gt;&#39;) + &#39;\\n&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const query = \`</span></span>
<span class="line"><span>(done on {{DATE:YYYY-MM-DD}})</span></span>
<span class="line"><span>path includes WorkRecord/日报</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hide backlink</span></span>
<span class="line"><span>hide created date</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dv.paragraph(&#39;\`\`\`tasks\\n&#39; + query + &#39;\\n\`\`\`&#39;, &#39;todo&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="未完成任务" tabindex="-1">未完成任务 <a class="header-anchor" href="#未完成任务" aria-label="Permalink to &quot;未完成任务&quot;">​</a></h3><div class="language-dataviewjs vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dataviewjs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function callout(text, type) {</span></span>
<span class="line"><span>    const allText = \`&gt; [!\${type}]\\n\` + text;</span></span>
<span class="line"><span>    const lines = allText.split(&#39;\\n&#39;);</span></span>
<span class="line"><span>    return lines.join(&#39;\\n&gt;&#39;) + &#39;\\n&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const query = \`</span></span>
<span class="line"><span>((created on {{DATE:YYYY-MM-DD}}) AND (done after {{DATE:YYYY-MM-DD}})) OR ((created on {{DATE:YYYY-MM-DD}}) AND (not done))</span></span>
<span class="line"><span>path includes WorkRecord/日报</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hide backlink</span></span>
<span class="line"><span>hide created date</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dv.paragraph(&#39;\`\`\`tasks\\n&#39; + query + &#39;\\n\`\`\`&#39;, &#39;todo&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h3>`,9)]))}const m=s(l,[["render",i]]);export{u as __pageData,m as default};
