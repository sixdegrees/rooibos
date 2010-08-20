<script type="text/javascript">
  var dialogMessageButtons = { OK: function() { $(this).dialog('close'); }, Cancel: function() {} };
</script>

<div class="navbar"><h1 class="txtC">Dialogs</h1></div>
<div class="flex"></div>
<div class="txtC">
  <a href="#" class="button" data-for="dialog">Basic Dialog</a>
  <a href="#" class="button" data-for="dialog-modal" data="{ modal: true }">Basic modal Dialog</a>
  <a href="#" class="button" data-for="dialog-message" data="{ modal: true, buttons: dialogMessageButtons }">Message modal Dialog</a>

  <div id="dialog" class="dialog" title="Basic dialog">
  	<p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the "x" icon.</p>
  </div>

  <div id="dialog-modal" class="dialog" title="Basic modal dialog">
  	<p>Adding the modal overlay screen makes the dialog look more prominent because it dims out the page content.</p>
  </div>

  <div id="dialog-message" class="dialog" title="Download complete">
  	<p>
  		Your files have downloaded successfully into the My Downloads folder.
  	</p>
  	<p>
  		Currently using <b>36% of your storage space</b>.
  	</p>
  </div>
</div>
<div class="flex"></div>