<#-- function: displaySettings

Description: Generates Bootstrap display classes based on provided breakpoints and display setting.

Parameters:
- breakPoints (list, optional): a list of breakpoints to apply the display setting to. Available breakpoints are: all, xs, sm, md, lg, xl.
- display (string, optional): the display setting to apply. Available values are: block, inline, inline-block, none.

Returns: 
- A string of Bootstrap display classes based on the provided breakpoints and display setting.
-->
<#function displaySettings breakPoints=[] display=''>
<#local breakPointsOrdered = [] />
<#if breakPoints?seq_contains('all')>
	<#local breakPointsOrdered += ['all'] />
</#if>
<#if breakPoints?seq_contains('xs')>
	<#local breakPointsOrdered += ['xs'] />
</#if>
<#if breakPoints?seq_contains('sm')>
	<#local breakPointsOrdered += ['sm'] />
</#if>
<#if breakPoints?seq_contains('md')>
	<#local breakPointsOrdered += ['md'] />
</#if>
<#if breakPoints?seq_contains('lg')>
	<#local breakPointsOrdered += ['lg'] />
</#if>
<#if breakPoints?seq_contains('xl')>
	<#local breakPointsOrdered += ['xl'] />
</#if>
<#local displayClass = '' />
<#if breakPointsOrdered?? && breakPointsOrdered?size &gt; 0>
<#list breakPointsOrdered as breakPoint>
	<#if breakPoint = 'xs' || breakPoint = 'all'>
		<#local displayClass += 'd-none' />
		<#if breakPoint = 'xs'>
			<#if !breakPointsOrdered?seq_contains('sm')>
				<#local displayClass += ' d-sm-${display}' />
			</#if>
		</#if>
	<#elseif breakPoint = 'sm' || breakPoint = 'md' || breakPoint = 'lg' || breakPoint = 'xl'>
		<#if breakPoint = 'sm'>
			<#if displayClass = ''>
				<#local displayClass += ' d-' + breakPoint + '-none' />
			<#elseif displayClass = 'd-none' && !breakPointsOrdered?seq_contains('md')>
				<#local displayClass += ' d-md-${display}' />
			</#if>
		<#elseif breakPoint = 'md'>
			<#if !breakPointsOrdered?seq_contains('sm')>
				<#local displayClass += ' d-' + breakPoint + '-none' />
			</#if>
			<#if !breakPointsOrdered?seq_contains('lg')>
				<#local displayClass += ' d-lg-${display}' />
			</#if>
		<#elseif breakPoint = 'lg'>
			<#if !breakPointsOrdered?seq_contains('md')>
				<#local displayClass += ' d-' + breakPoint + '-none' />
			</#if>
			<#if !breakPointsOrdered?seq_contains('xl')>
				<#local displayClass += ' d-xl-${display}' />
			</#if>
		<#elseif breakPoint = 'xl'>
			<#if !breakPointsOrdered?seq_contains('lg')>
				<#local displayClass += ' d-' + breakPoint + '-none' />
			</#if>
		</#if>
	<#else>
		<#local displayClass += ' undefined_breakpoint' />
	</#if>
</#list>
</#if>
<#return displayClass?trim>
</#function>