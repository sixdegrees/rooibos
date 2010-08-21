<div class="navbar"><h1 class="txtC">Progress bars</h1></div>
<div class="flex"></div>
<div class="txtC" style="margin: 0 100px;">
  <div class="progressbar" data="{ value: 37 }"></div>
  <div class="line"></div>
  <div class="progressbar animated" data="{ value: 26 }"></div>
  <div class="line"></div>
  <div class="progressbar" data="{ value: 59 }" style="height: 12px"></div>
  <div class="line"></div>
  <div class="progressbar animated" data="{ value: 45 }" style="height: 12px"></div>
</div>
<div class="flex"></div>

<script type="text/javascript">
  $("#toggle-loading").click(function(e) {
    e.preventDefault();
    loading("You gonna wait a bit...").toggle();
  });
</script>