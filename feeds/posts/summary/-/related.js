---
layout: null
---
related_results_labels({
  "version":"1.0","encoding":"UTF-8","feed":{
    "xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$blogger":"http://schemas.google.com/blogger/2008","xmlns$georss":"http://www.georss.org/georss","xmlns$gd":"http://schemas.google.com/g/2005","xmlns$thr":"http://purl.org/syndication/thread/1.0","id":{"$t":"tag:blogger.com,1999:blog-801953276432701327"},
    
    "updated":{"$t":"{{ site.time | date_to_xmlschema }}"},
    "category":[
      {"term":"Documentation"},{"term":"Features"},{"term":"Add-ons"},{"term":"Customisation"},{"term":"Fullpage"},{"term":"New in Plus UI"},{"term":"Optimization"},{"term":"Product"},{"term":"Sponsored"},{"term":"Tips"}],
    "title":{"type":"text","$t":"{{ site.title }}"},"subtitle":{"type":"html","$t":"{{ site.subjudul }}"},"link":[{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"{{ site.url }}/feeds\/posts\/summary"},{"rel":"self","type":"application/atom+xml","href":"https:\/\/www.blogger.com\/feeds\/801953276432701327\/posts\/summary\/-\/Features?alt=json-in-script\u0026max-results=2\u0026orderby=updated"},{"rel":"alternate","type":"text/html","href":"{{ '/artikel/' | prepend: site.url }}"},{"rel":"hub","href":"http://pubsubhubbub.appspot.com/"},{"rel":"next","type":"application/atom+xml","href":"https:\/\/www.blogger.com\/feeds\/801953276432701327\/posts\/summary\/-\/Features\/-\/Features?alt=json-in-script\u0026start-index=3\u0026max-results=2\u0026orderby=updated"}],"author":[{"name":{"$t":"Unknown"},"email":{"$t":"noreply@blogger.com"},"gd$image":{"rel":"http://schemas.google.com/g/2005#thumbnail","width":"16","height":"16","src":"https:\/\/img1.blogblog.com\/img\/b16-rounded.gif"}}],"generator":{"version":"7.00","uri":"http://www.blogger.com","$t":"Blogger"},"openSearch$totalResults":{"$t":"6"},"openSearch$startIndex":{"$t":"1"},"openSearch$itemsPerPage":{"$t":"2"},
    "entry":[
      {% assign poss = site.artikel | sort: "date" | reverse %}
  {% for post in poss %}
      {
        "id":{"$t":"tag:blogger.com,1999:blog-801953276432701327.post-{{ post.content | size }}{{ post.date | date: "%Y%m%d%H%M" }}"},
        "published":{"$t":"{{ post.date | date_to_xmlschema }}"},"updated":{"$t":"{{ post.date | date_to_xmlschema }}"},
  "category":[
   
    {
      "scheme":"http://www.blogger.com/atom/ns#","term":"{{ post.tag }}"}
  
  ],
    "title":{
      "type":"text","$t":"{{ post.title }}"},
        "summary":{
          "type":"text","$t":"{{ post.description }}"},
            "link":[
              {
                "rel":"replies",
                "type":"application/atom+xml",
                "href":"https:\/\/plus-ui.fineshopdesign.com\/feeds\/576615824737679485\/comments\/default",
                "title":"Post Comments"
              },
              {
                "rel":"replies",
                "type":"text/html",
                "href":"{{ post.url | prepend: site.url }}?m=0#comment-form",
                "title":"14 Comments"
              },{"rel":"edit","type":"application/atom+xml","href":"https:\/\/www.blogger.com\/feeds\/801953276432701327\/posts\/default\/576615824737679485"},{"rel":"self","type":"application/atom+xml","href":"https:\/\/www.blogger.com\/feeds\/801953276432701327\/posts\/default\/576615824737679485"},{"rel":"alternate","type":"text/html","href":"{{ post.url | prepend: site.url }}","title":"{{ post.title }}"}],
              "author":[
                {"name":{"$t":"{{ site.title }}"},"uri":{"$t":"{{ site.url }}"},"email":{"$t":"info@sabdaliterasi.xyz"},"gd$image":{"rel":"http://schemas.google.com/g/2005#thumbnail","width":"32","height":"32","src":"{{ site.avatar | prepend: site.url }}"}}],
                "media$thumbnail":{
                  "xmlns$media":"http://search.yahoo.com/mrss/","url":"{{ post.image }}?width=300&height=169&amp;ssl=1","height":"169","width":"300"},
                    "thr$total":{
                      "$t":"14"}
  
  }{% if forloop.last == false %},{% endif %}
{% endfor %} 
       
    ]}});
