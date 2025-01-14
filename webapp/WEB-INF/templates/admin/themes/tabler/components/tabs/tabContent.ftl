<#-- 
Macro: tabContent

Description: Generates a tab content container with an optional ID and parameters.

Parameters:
- id (string, optional): the ID of the tab content container.
- params (string, optional): additional parameters to add to the HTML code.

-->
<#macro tabContent id='' params=''>
<div class="card-body">
<div class="tab-content"<#if id!=''> id="${id}"</#if><#if params!=''> ${params}</#if>>
<#nested>
</div>
</div>
</#macro>