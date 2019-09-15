# dependency_analyzer
Analizador de dependencias de javascript


El archivos websites.csv contiene los sitios a analizar (pueden ser locales o remotos)
<br>
Por ejemplo:
<ul>
<li>Fameghino,fameghino/index.html</li>
<li>FCE,https://www.econo.unlp.edu.ar</li>
<li>NaNLABS,nanlabs/index.html</li>
<li>Python Argentina,http://www.python.org.ar</li>
</ul>

<h2>Scripts:</h2>

<h3>length.js</h3>

<p>Imprime un listado de los sitios y su tamaño</p>
<pre>
Salida de ejemplo:
Fameghino, 3673
NaNLABS, 34498
Fameghino remoto, 3673
FCE, 54399
</pre>
Se ejecuta de la siguiente forma:
<pre><code>
node length.js
</code></pre>


<h3>dependencies</h3>


<p>Imprime todas las librerías de javascript</p>
<pre>
Salida de ejemplo:
Fameghino, jquery-1.9.1.js
Fameghino, bootstrap.min.js
Fameghino, pwa.js
NaNLABS, comment_count.js?ver=3.0.16
NaNLABS, main.js?ver=4.9.11
NaNLABS, wp-embed.min.js?ver=4.9.11
Fameghino remoto, jquery-1.9.1.js
Fameghino remoto, bootstrap.min.js
Fameghino remoto, pwa.js
Python Argentina, html5shiv.js
Python Argentina, respond.min.js
Python Argentina, jquery.min.js
Python Argentina, bootstrap.min.js
Python Argentina, bootstrap-growl.min.js
Python Argentina, web.js
FCE, jquery-3.2.1.min.js
FCE, js?id=UA-109700229-1
FCE, home-4398c2301de97daab38bb2b4df9dc71f.js
</pre>

Se ejecuta:
<pre><code>
node dependencies.js
</code></pre>


<h3>frecuency</h3>

<p>Imprime las ocurrencias de cada librería</p>
<pre>
Salida de ejemplo:
jquery-1.9.1.js, 2
bootstrap.min.js, 3
pwa.js, 2
jquery-3.2.1.min.js, 1
js?id=UA-109700229-1, 1
home-4398c2301de97daab38bb2b4df9dc71f.js, 1
comment_count.js?ver=3.0.16, 1
main.js?ver=4.9.11, 1
wp-embed.min.js?ver=4.9.11, 1
html5shiv.js, 1
respond.min.js, 1
jquery.min.js, 1
bootstrap-growl.min.js, 1
web.js, 1
</pre>

Se ejecuta:
<pre><code>
node frecuency.js
</code></pre>
