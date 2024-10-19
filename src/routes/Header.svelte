<script lang="ts">
	export let isUserLoggedIn;
</script>
<header>
	<nav>
		<ul class="flex justify-end gap-8 py-8 px-8 border-b-2 border-black">
			{#if isUserLoggedIn}
				<li>
					<a href="/admin">Admin</a>
				</li>
				<li>
					<a href="/api/logout">LogOut</a>
				</li>
			{:else}
				<li>
					<a href="/login">Login</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>
