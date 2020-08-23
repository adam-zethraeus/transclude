* blocks don't redraw on the focus view information change
* solidify block-content representation model. reconcile it with markdown.
  * there's a significant tension between blocks-from-markdown and transclusion.
  * option: if a block is split always keep acontainer super-block
  * option: accept markdown as an import/export target wihtout letting it dictate internal representaiton
  	* but how would you represent a multi-block transclude in general?
* pick a strategy for representing url state.
  * connected-router vs. custom representation of route as a 'view' state property.
