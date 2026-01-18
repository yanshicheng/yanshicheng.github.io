import{_ as s,c as a,o as p,aM as e}from"./chunks/framework.DvFTVADX.js";const m=JSON.parse('{"title":"周报模板","description":"","frontmatter":{"UID":{"object Object":null},"aliases":null,"tags":"Diary","Type":"Week Diary","Year":{"object Object":null},"Week":{"object Object":null},"Date":{"object Object":null},"title":"周报模板","date":"2024-01-27T01:42:21.000Z","permalink":"/pages/e27280/","categories":["template"]},"headers":[],"relativePath":"pages/e27280.md","filePath":"100.script/周报模板.md","lastUpdated":1768731971000}'),l={name:"pages/e27280.md"};function t(i,n,r,c,u,o){return p(),a("div",null,n[0]||(n[0]=[e(`<div style="display:none;" hidden="true" aria-hidden="true">Are you an LLM? You can read better optimized documentation at /100.script/周报模板.md for this page in Markdown format</div><h1 id="周报模板" tabindex="-1">周报模板 <a class="header-anchor" href="#周报模板" aria-label="Permalink to &quot;周报模板&quot;">​</a></h1><h2 id="本周概要" tabindex="-1">本周概要 <a class="header-anchor" href="#本周概要" aria-label="Permalink to &quot;本周概要&quot;">​</a></h2><div class="language-dataviewjs vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dataviewjs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//日记文件名格式（定义成你自己日记文件名的格式，替换其中的变量）</span></span>
<span class="line"><span>//yyyy = 年份（例如：2023）</span></span>
<span class="line"><span>//m    = 自适应位数月份（例如：3、10）</span></span>
<span class="line"><span>//mm   = 两位数月份（例如：03、10）</span></span>
<span class="line"><span>//d    = 自适应位数日期（例如：3、10）</span></span>
<span class="line"><span>//dd   = 两位数日期（例如：03、10）</span></span>
<span class="line"><span>let dailyFileFormat = &quot;yyyy-m-d-日报&quot;;</span></span>
<span class="line"><span>//日记文件夹路径</span></span>
<span class="line"><span>const dailyFilePath = &quot;WorkRecord/日报&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//日报文件名格式（定义成你自己日报文件名的格式，替换其中的变量）</span></span>
<span class="line"><span>//yyyy = 年份（例如：2023）</span></span>
<span class="line"><span>//m    = 自适应位数月份（例如：3、10）</span></span>
<span class="line"><span>//mm   = 两位数月份（例如：03、10）</span></span>
<span class="line"><span>//d    = 自适应位数日期（例如：3、10）</span></span>
<span class="line"><span>//dd   = 两位数日期（例如：03、10）</span></span>
<span class="line"><span>let dailyWorkFileFormat = &quot;yyyy-m-d-日报&quot;;</span></span>
<span class="line"><span>//日记文件夹路径</span></span>
<span class="line"><span>const dailyWorkFilePath = &quot;WorkRecord/周报&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const weekFirstDay = dv.current().weekFirstDay;</span></span>
<span class="line"><span>const weekLastDat = dv.current().weekLastDat;</span></span>
<span class="line"><span>const weekday=[&quot;星期日&quot;,&quot;星期一&quot;,&quot;星期二&quot;,&quot;星期三&quot;,&quot;星期四&quot;,&quot;星期五&quot;,&quot;星期六&quot;];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//本周日程输出</span></span>
<span class="line"><span>let resultText = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//用于概要统计</span></span>
<span class="line"><span>let dailyCountComplete = 0;</span></span>
<span class="line"><span>let dailyCountFail = 0;</span></span>
<span class="line"><span>let workCountComplete = 0;</span></span>
<span class="line"><span>let workCountFail = 0;</span></span>
<span class="line"><span>let docCount = 0;</span></span>
<span class="line"><span>for(var i = 0;i &lt;= 6; i++){</span></span>
<span class="line"><span>    const nowDate = new Date(weekFirstDay);</span></span>
<span class="line"><span>    nowDate.setDate(nowDate.getDate() + i);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //当天有日记才生成数据</span></span>
<span class="line"><span>    const dayFile = dv.page(dailyFilePath + &quot;/&quot; + formatDailyFileName(nowDate,dailyFileFormat) +&quot;.md&quot;);</span></span>
<span class="line"><span>    if(dayFile != null){</span></span>
<span class="line"><span>        //标题</span></span>
<span class="line"><span>        resultText += &quot;\\n&quot;;</span></span>
<span class="line"><span>        resultText += &quot;&gt; [!TIP]- &quot; +  weekday[nowDate.getDay()] +&quot;\\n&gt; &lt;span style=&#39;color: #72e9fd;font-weight:bold&#39;&gt;📗[[&quot; + dayFile.file.path + &quot;|&quot;+dayFile.file.name+&quot;]]&lt;/span&gt;\\n&quot;;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>        //日程</span></span>
<span class="line"><span>        resultText += &quot;&gt;&gt; [!SUCCESS] 日程表\\n&quot;</span></span>
<span class="line"><span>        if(dayFile != null &amp;&amp; dayFile.file != null){</span></span>
<span class="line"><span>            const dayTask = dayFile.file.tasks;</span></span>
<span class="line"><span>            for(var rc = 0;rc &lt; dayTask.length;rc ++){</span></span>
<span class="line"><span>                dayTask[rc].status == &quot;x&quot; ? dailyCountComplete++ : dailyCountFail++;</span></span>
<span class="line"><span>                resultText += &quot;&gt;&gt; &quot;+dayTask[rc].symbol+&quot; [&quot;+dayTask[rc].status+&quot;] &quot;+dayTask[rc].text+&quot;\\n&quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        //工作</span></span>
<span class="line"><span>        resultText += &quot; &gt; &quot;</span></span>
<span class="line"><span>        resultText += &quot;\\n &gt;&gt; [!example] 工作项\\n&quot;</span></span>
<span class="line"><span>        const dayWorkFile = dv.page(dailyWorkFilePath + &quot;/&quot; + formatDailyFileName(nowDate,dailyWorkFileFormat) +&quot;.md&quot;);</span></span>
<span class="line"><span>        if(dayWorkFile != null &amp;&amp; dayWorkFile.file != null){</span></span>
<span class="line"><span>            const dayTask = dayWorkFile.file.tasks;</span></span>
<span class="line"><span>            for(var gz = 0;gz &lt; dayTask.length;gz ++){</span></span>
<span class="line"><span>                dayTask[gz].status == &quot;x&quot; ? workCountComplete++ : workCountFail++;</span></span>
<span class="line"><span>                resultText += &quot;&gt;&gt; &quot;+dayTask[gz].symbol+&quot; [&quot;+dayTask[gz].status+&quot;] &quot;+dayTask[gz].text+&quot;\\n&quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>        //文章</span></span>
<span class="line"><span>        resultText += &quot; &gt;&quot;</span></span>
<span class="line"><span>        resultText += &quot;\\n &gt;&gt; [!NOTE] 新文章\\n&quot;;</span></span>
<span class="line"><span>        const dayNewDoc = dv.pages().where(file =&gt; {</span></span>
<span class="line"><span>            const fileDate = new Date(file.file.cday);</span></span>
<span class="line"><span>            return (fileDate.getDate() == nowDate.getDate() &amp;&amp; fileDate.getMonth() == nowDate.getMonth() &amp;&amp; fileDate.getFullYear() &amp;&amp; nowDate.getFullYear());</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>        for(var j = 0;j&lt;dayNewDoc.length;j++){</span></span>
<span class="line"><span>            docCount++;</span></span>
<span class="line"><span>            resultText += &quot;&gt;&gt; - [[ &quot; + dayNewDoc[j].file.path + &quot;|&quot;+dayNewDoc[j].file.name+&quot; ]]\\n&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//输出-本周概要</span></span>
<span class="line"><span>dv.header(3,&quot;本周概要&quot;)</span></span>
<span class="line"><span>let summaryResult = &quot;&gt; [!SUCCESS] 共完成 \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt; - 🌞日程：&lt;span style=&#39;color: #82eb82;font-weight:bold&#39;&gt;&quot;+dailyCountComplete+&quot;&lt;/span&gt; \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt; - 💼工作任务：&lt;span style=&#39;color: #82eb82;font-weight:bold&#39;&gt;&quot;+workCountComplete+&quot;&lt;/span&gt; \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt; - ✒️新文章：&lt;span style=&#39;color: #82eb82;font-weight:bold&#39;&gt;&quot;+docCount+&quot;&lt;/span&gt; \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt; \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt;&gt; [!FAIL]- 未完成 \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt;&gt; - 🌞日程：&lt;span style=&#39;color: #f078a0;font-weight:bold&#39;&gt;&quot;+dailyCountFail+&quot;&lt;/span&gt; \\n&quot; +</span></span>
<span class="line"><span>&quot;&gt;&gt; - 💼工作任务：&lt;span style=&#39;color: #f078a0;font-weight:bold&#39;&gt;&quot;+workCountFail+&quot;&lt;/span&gt; \\n&quot;;</span></span>
<span class="line"><span>dv.span(summaryResult)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//文件名日期格式化</span></span>
<span class="line"><span>function formatDailyFileName(date,format){</span></span>
<span class="line"><span>    const dateYear = date.getFullYear();</span></span>
<span class="line"><span>    const dateMonth = date.getMonth() + 1;</span></span>
<span class="line"><span>    const dateDate = date.getDate();</span></span>
<span class="line"><span>    return format</span></span>
<span class="line"><span>        .replace(&quot;yyyy&quot;,dateYear)</span></span>
<span class="line"><span>        .replace(&quot;mm&quot;,dateMonth &lt; 10 ? &#39;0&#39; + dateMonth : dateMonth)</span></span>
<span class="line"><span>        .replace(&quot;m&quot;,dateMonth)</span></span>
<span class="line"><span>        .replace(&quot;dd&quot;,dateDate &lt; 10 ? &#39;0&#39; + dateDate : dateDate)</span></span>
<span class="line"><span>        .replace(&quot;d&quot;,dateDate)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br></div></div><h2 id="本周日报" tabindex="-1">本周日报 <a class="header-anchor" href="#本周日报" aria-label="Permalink to &quot;本周日报&quot;">​</a></h2><p>[[2024-07-29-日报]] | [[2024-07-30-日报]] | [[2024-07-31-日报]] | [[2024-08-01-日报]] | [[2024-08-02-日报]] | [[2024-08-03-日报]] | [[2024-08-04-日报]]</p><hr><h2 id="任务总结" tabindex="-1">任务总结 <a class="header-anchor" href="#任务总结" aria-label="Permalink to &quot;任务总结&quot;">​</a></h2><h3 id="本周已完成" tabindex="-1">本周已完成 <a class="header-anchor" href="#本周已完成" aria-label="Permalink to &quot;本周已完成&quot;">​</a></h3><div class="language-dataviewjs vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dataviewjs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function callout(text, type) {</span></span>
<span class="line"><span>    const allText = \`&gt; [!\${type}]\\n\` + text;</span></span>
<span class="line"><span>    const lines = allText.split(&#39;\\n&#39;);</span></span>
<span class="line"><span>    return lines.join(&#39;\\n&gt; &#39;) + &#39;\\n&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const query = \`</span></span>
<span class="line"><span>(done) AND (created &gt;=  2024-07-29   AND created &lt;= 2024-08-04  )</span></span>
<span class="line"><span>path includes WorkRecord/日报</span></span>
<span class="line"><span>group by done</span></span>
<span class="line"><span>hide backlink</span></span>
<span class="line"><span>hide created date</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dv.paragraph(&#39;\`\`\`tasks\\n&#39; + query + &#39;\\n\`\`\`&#39;, &#39;done&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="本周未完成" tabindex="-1">本周未完成 <a class="header-anchor" href="#本周未完成" aria-label="Permalink to &quot;本周未完成&quot;">​</a></h3><div class="language-dataviewjs vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dataviewjs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function callout(text, type) {</span></span>
<span class="line"><span>    const allText = \`&gt; [!\${type}]\\n\` + text;</span></span>
<span class="line"><span>    const lines = allText.split(&#39;\\n&#39;);</span></span>
<span class="line"><span>    return lines.join(&#39;\\n&gt; &#39;) + &#39;\\n&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const query = \`</span></span>
<span class="line"><span>(not done) AND (created &gt;=  2024-07-29   AND created &lt;= 2024-08-04  )</span></span>
<span class="line"><span>path includes WorkRecord/日报</span></span>
<span class="line"><span>group by created</span></span>
<span class="line"><span>hide backlink</span></span>
<span class="line"><span>hide created date</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dv.paragraph(&#39;\`\`\`tasks\\n&#39; + query + &#39;\\n\`\`\`&#39;, &#39;undone&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><hr><h2 id="本周总结" tabindex="-1">本周总结 <a class="header-anchor" href="#本周总结" aria-label="Permalink to &quot;本周总结&quot;">​</a></h2><hr>`,15)]))}const d=s(l,[["render",t]]);export{m as __pageData,d as default};
