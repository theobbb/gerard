<script>
	import { page } from '$app/state';
</script>

<div class="mb-64 font-serif text-5xl font-thin text-balance">
	{#if page.params.lang == 'en'}
		<span>Illustrator and educator</span> with over three decades of work

		<span class=""></span>for
		<span class="whitespace-nowrap italic">The New York Times</span>,
		<span class="whitespace-nowrap italic">The New Yorker</span>,
		<span class="whitespace-nowrap italic">Rolling Stone</span>, and many more— from France to
		Montreal, shaping the visual language of the world’s leading publications.
		<!-- Illustrator and educator <br /> Three decades of illustration for The New York Times, The New Yorker,
		and Rolling Stone. From Paris to Montreal, shaping the visual language of the world’s leading publications. -->
	{:else}
		Illustrateur et enseignant depuis plus de trente ans pour <span class="whitespace-nowrap italic"
			>The New York Times</span
		>, <span class="whitespace-nowrap italic">The New Yorker</span>,
		<span class="whitespace-nowrap italic">Rolling Stone</span> et bien d’autres—de la France à Montréal,
		au cœur du langage visuel des grandes publications internationales.
	{/if}
</div>
<svelte:head>
	<title>Gérard DuBois</title>
	<meta
		name="description"
		content="Association étudiant du programme de design graphique de l'UQAM - L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme."
	/>
</svelte:head>
