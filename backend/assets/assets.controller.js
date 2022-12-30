export const loadAllAssets = async (req, res) => {
  const assets = [
    {
      type: 'image',
      src: 'https://via.placeholder.com/350x250/459ba8/fff?text=Image1',
      height: 350,
      width: 250,
    },
    {
      src: 'https://via.placeholder.com/350x250/79c267/fff?text=Image2',
      height: 350,
      width: 250,
    },
    {
      src: 'https://via.placeholder.com/350x250/79c267/fff?text=Image3',
      height: 350,
      width: 250,
    },
  ];
  res.json(assets);
};

// public templates
export const publicWebPageTemplates = (userId) => [
  {
    user: userId,
    name: "Template 1",
    slug: "template-1",
    content: {
      "mycustom-html": "<div class=\"gjs-row\"><div class=\"gjs-cell\"><div class=\"gjs-row\"><div class=\"gjs-cell\" id=\"ihjz\"><div id=\"iv3i\">Hello 👋 </div><div id=\"id688\">ABCD</div></div><div class=\"gjs-cell\" id=\"i017\"><div id=\"ipcy\">Hoe are you ?</div><div id=\"i8849\">XYZ</div></div></div></div></div>",
      "mycustom-components": "[{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"components\":[{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"attributes\":{\"id\":\"ihjz\"},\"components\":[{\"type\":\"text\",\"attributes\":{\"id\":\"iv3i\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"Hello 👋 \",\"_innertext\":false}]},{\"type\":\"text\",\"attributes\":{\"id\":\"id688\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"ABCD\",\"_innertext\":false}]}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"attributes\":{\"id\":\"i017\"},\"components\":[{\"type\":\"text\",\"attributes\":{\"id\":\"ipcy\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"Hoe are you ?\",\"_innertext\":false}]},{\"type\":\"text\",\"attributes\":{\"id\":\"i8849\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"XYZ\",\"_innertext\":false}]}]}]}]}]}]",
      "mycustom-assets": "[{\"type\":\"image\",\"src\":\"http://placehold.it/350x250/459ba8/fff/image2.jpg\",\"unitDim\":\"px\",\"height\":350,\"width\":250},{\"type\":\"image\",\"src\":\"http://placehold.it/350x250/79c267/fff/image3.jpg\",\"unitDim\":\"px\",\"height\":350,\"width\":250},{\"type\":\"image\",\"src\":\"http://placehold.it/350x250/79c267/fff/image3.jpg\",\"unitDim\":\"px\",\"height\":350,\"width\":250}]",
      "mycustom-css": "* { box-sizing: border-box; } body {margin: 0;}.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#iv3i{padding:10px;}#ipcy{padding:10px;}#id688{padding:10px;}#i8849{padding:10px;}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}}",
      "mycustom-styles": "[{\"selectors\":[{\"name\":\"gjs-row\",\"private\":1}],\"style\":{\"display\":\"table\",\"padding-top\":\"10px\",\"padding-right\":\"10px\",\"padding-bottom\":\"10px\",\"padding-left\":\"10px\",\"width\":\"100%\"}},{\"selectors\":[{\"name\":\"gjs-cell\",\"private\":1}],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[\"gjs-cell30\"],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[\"gjs-cell70\"],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[{\"name\":\"gjs-cell\",\"private\":1}],\"style\":{\"width\":\"8%\",\"display\":\"table-cell\",\"height\":\"75px\"}},{\"selectors\":[\"#iv3i\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ipcy\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#id688\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#i8849\"],\"style\":{\"padding\":\"10px\"}}]"
    }
  },
  {
    user: userId,
    name: "Template 2",
    slug: "template-2",
    content: {
      "mycustom-html": "<div class=\"gjs-row\"><div class=\"gjs-cell\"><div class=\"gjs-row\"><div class=\"gjs-cell\" id=\"ihjz\"><div id=\"iv3i\">Hello 👋 </div><div id=\"id688\">ABCD</div></div><div class=\"gjs-cell\" id=\"i017\"><div id=\"ipcy\">Hoe are you ?</div><div id=\"i8849\">XYZ</div></div></div></div></div>",
      "mycustom-components": "[{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"components\":[{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"attributes\":{\"id\":\"ihjz\"},\"components\":[{\"type\":\"text\",\"attributes\":{\"id\":\"iv3i\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"Hello 👋 \",\"_innertext\":false}]},{\"type\":\"text\",\"attributes\":{\"id\":\"id688\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"ABCD\",\"_innertext\":false}]}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"attributes\":{\"id\":\"i017\"},\"components\":[{\"type\":\"text\",\"attributes\":{\"id\":\"ipcy\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"Hoe are you ?\",\"_innertext\":false}]},{\"type\":\"text\",\"attributes\":{\"id\":\"i8849\"},\"components\":[{\"type\":\"textnode\",\"removable\":false,\"draggable\":false,\"highlightable\":0,\"copyable\":false,\"selectable\":true,\"content\":\"XYZ\",\"_innertext\":false}]}]}]}]}]}]",
      "mycustom-assets": "[{\"type\":\"image\",\"src\":\"http://placehold.it/350x250/459ba8/fff/image2.jpg\",\"unitDim\":\"px\",\"height\":350,\"width\":250},{\"type\":\"image\",\"src\":\"http://placehold.it/350x250/79c267/fff/image3.jpg\",\"unitDim\":\"px\",\"height\":350,\"width\":250},{\"type\":\"image\",\"src\":\"http://placehold.it/350x250/79c267/fff/image3.jpg\",\"unitDim\":\"px\",\"height\":350,\"width\":250}]",
      "mycustom-css": "* { box-sizing: border-box; } body {margin: 0;}.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#iv3i{padding:10px;}#ipcy{padding:10px;}#id688{padding:10px;}#i8849{padding:10px;}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}}",
      "mycustom-styles": "[{\"selectors\":[{\"name\":\"gjs-row\",\"private\":1}],\"style\":{\"display\":\"table\",\"padding-top\":\"10px\",\"padding-right\":\"10px\",\"padding-bottom\":\"10px\",\"padding-left\":\"10px\",\"width\":\"100%\"}},{\"selectors\":[{\"name\":\"gjs-cell\",\"private\":1}],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[\"gjs-cell30\"],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[\"gjs-cell70\"],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[{\"name\":\"gjs-cell\",\"private\":1}],\"style\":{\"width\":\"8%\",\"display\":\"table-cell\",\"height\":\"75px\"}},{\"selectors\":[\"#iv3i\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ipcy\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#id688\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#i8849\"],\"style\":{\"padding\":\"10px\"}}]"
    }
  }
];
