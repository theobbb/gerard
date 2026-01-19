<script>
	import { page } from '$app/state';

	const lang = $derived(page.params.lang);
</script>

<div class="fixed top-gap-y right-gap-x left-gap-x border-t"></div>
<div class="flex min-h-[calc(100svh-11rem)] flex-col justify-between text-xl">
	<div class="grid-12 text-xl">
		<div class="col-span-full lg:col-span-3 lg:col-start-6">
			<a href="mailto:info@gdubois.com" target="_blank">info@gdubois.com</a>
			<br />
			<a href="tel:+14504658040" target="_blank"> tel: 450-465-8040</a>
		</div>
		<div class="col-span-full lg:col-span-3">
			525 Green street
			<br /> St. Lambert, Qc, J4P 1V4 Canada
		</div>
	</div>

	<div>
		<div class="grid-12 mt-48 border-t text-xl">
			<div class="col-span-full col-start-1 translate-y-0.5 font-serif lg:col-span-5">
				{#if lang == 'en'}
					Represented in USA <br />by
				{:else}
					Représenté aux USA <br />par
				{/if}
				<span class="italic"> Marlena Agency</span>
			</div>
			<div class="col-span-full lg:col-span-3 lg:col-start-6">
				<a href="https://marlenaagency.com/" target="_blank">marlenaagency.com</a>
				<br />
				<a href="mailto:marlena@marlenaagency.com" target="_blank">marlena@marlenaagency.com</a>
				<br />
				<a href="tel:+16092529405" target="_blank">tel: 609-252-9405</a>

				<br />
				<a href="tel:+16092521949" target="_blank">fax: 609-252-1949</a>
			</div>
			<div class="col-span-full xl:col-span-3 xl:col-start-6 2xl:col-start-9">
				322 Ewing Street
				<br />
				Princeton, NJ 08540, USA
			</div>
		</div>

		<div class="grid-12 mt-12 border-t text-xl">
			<div class="col-span-full col-start-1 translate-y-0.5 font-serif lg:col-span-5">
				{#if lang == 'en'}
					Represented in France and England
					<br />
					by
				{:else}
					Représenté en Europe
					<br />
					par
				{/if}

				<span class="italic">Costume 3 Pièces</span>
			</div>
			<div class="col-span-full lg:col-span-3 lg:col-start-6">
				<a href="https://costume3pieces.com" target="_blank">costume3pieces.com</a>
				<br />
				<a href="mailto:contact@costume3pieces.com" target="_blank">contact@costume3pieces.com</a>
				<br />
				<a href="tel:+330142471010" target="_blank">tel: 01 42 47 10 10</a>
			</div>
		</div>
	</div>
</div>

<style>
	a:hover {
		@apply underline underline-offset-4;
	}
</style>
