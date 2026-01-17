<script>
	import { page } from '$app/state';
</script>

<div class="mb-64 font-serif text-5xl font-thin text-balance">
	{#if page.params.lang == 'en'}
		Illustrator and educator <br /> Three decades of illustration for The New York Times, The New Yorker,
		and Rolling Stone. From Paris to Montreal, shaping the visual language of the world’s leading publications.
	{:else}
		Illustrateur et professeur <br /> Three decades of illustration for The New York Times, The New Yorker,
		and Rolling Stone. From Paris to Montreal, shaping the visual language of the world’s leading publications.
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
