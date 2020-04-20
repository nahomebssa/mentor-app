const { Component } = React;

class HomeView extends Component {
	render () {
		const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
		if (isSignedOut) return <Redirect to="/sign-in" />
		return (
			<div className="HomeView">
				<h1 className="title">Home</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor iure laboriosam, dolorem commodi perferendis earum culpa soluta, accusantium id in voluptatem, corporis enim totam. Debitis officia vitae in quia ipsam.
				Dolorum fugit tempora voluptatum ab aspernatur! Cum voluptatum culpa obcaecati voluptas. Esse, repellendus id, consequuntur, quis quaerat earum fugit in nihil voluptatibus temporibus magnam velit quam quae laudantium. Quam, nemo!
				At quam facilis eius, aliquid voluptatem vitae dolor quos ratione labore eligendi vel libero recusandae nisi eos odio sapiente repellendus aperiam accusantium rerum aspernatur! Cum quis ducimus quae doloribus impedit?
				Distinctio voluptatem cum nostrum doloribus a deserunt debitis ab itaque consectetur accusantium accusamus officiis veniam perspiciatis sunt maiores tempore laborum numquam eos ex, repellendus iusto porro vero. Velit, ratione odio.
				Quis numquam laboriosam rem ullam. In consectetur facere temporibus itaque saepe ullam laudantium omnis fugiat qui earum libero nihil, perferendis, iste expedita sint. Harum quam soluta iusto in nesciunt commodi.
				Modi, accusantium suscipit voluptatum, voluptatibus temporibus exercitationem et maxime ipsa tempora id nihil neque autem, quas recusandae a? Explicabo a animi vitae nisi earum sequi totam doloribus culpa impedit deleniti.
				Deserunt, praesentium laboriosam! Hic inventore qui quaerat maxime cumque libero ea dolore voluptate, dicta cum incidunt molestiae laudantium modi laborum sit rerum fugit eos necessitatibus, ipsum sequi ipsa? Nemo, quaerat.
				Dignissimos aperiam rem quia culpa, placeat beatae obcaecati saepe aut doloremque eius debitis dolorum esse maxime enim quod ipsum neque voluptas commodi reiciendis! Aut placeat necessitatibus omnis quis suscipit hic?
				Incidunt quae facilis ut, quis debitis nisi, ad quia, iusto cum assumenda omnis perferendis quos? Dolorem earum doloremque, possimus quidem, iusto iste quibusdam qui at est placeat, corporis nulla asperiores!
				Doloremque, harum et voluptatem quisquam quod rem eligendi consectetur magnam. Aperiam hic ratione fugit, doloribus numquam laborum eligendi iure nisi dicta provident laboriosam dolore iusto deleniti, suscipit, quae deserunt rerum?
				Reprehenderit, quisquam nesciunt. Dolorem incidunt non est reiciendis, sunt aut, doloribus, hic voluptate maiores impedit laudantium deleniti odit? Deleniti explicabo nihil sapiente ipsam vel inventore obcaecati eum ab possimus quod.
				Quibusdam possimus facilis laborum dignissimos enim dolor! Et exercitationem quas consequuntur, velit perspiciatis, rem voluptatum dicta ex pariatur labore nihil praesentium quia eveniet deleniti odio doloribus dignissimos esse iusto ullam.
				Eveniet dolorum odit nam, molestias quasi at magnam! Cupiditate optio id natus voluptatum debitis voluptas fugit earum odit assumenda nam, odio magnam dolorum, consectetur impedit est fugiat distinctio nisi minima?
				Praesentium, qui. Blanditiis id veniam corrupti architecto hic at deleniti doloribus perferendis excepturi consequatur, laudantium est necessitatibus quos expedita sint incidunt numquam ullam esse earum exercitationem! Sed minus rerum sequi.
				Officiis cupiditate modi facilis odit quasi, fugit velit voluptates, assumenda rerum voluptas accusamus culpa maxime dolorem quod nemo expedita possimus. Excepturi repudiandae facilis quaerat, cum saepe non dignissimos quasi sapiente!
				Nesciunt ut laborum dignissimos libero, et atque voluptate voluptates adipisci impedit animi sequi nobis accusantium vel amet sint magnam corrupti distinctio earum similique soluta minima ex? At repudiandae eveniet voluptas!
				Molestias non quas dolore molestiae adipisci cum perferendis at ullam. Vel, ad. Perspiciatis laborum nisi velit molestias, sapiente est nam quis reprehenderit fugiat, asperiores hic veniam, exercitationem eveniet soluta molestiae?
				Minima a magni ducimus voluptatem neque commodi. Aut quidem voluptatibus ratione minima ipsum minus earum quia aspernatur commodi quos neque quis, eum libero obcaecati! Porro explicabo reprehenderit magnam dicta nihil.
				Soluta tempore recusandae veritatis fugiat nostrum placeat, vitae, aliquid dolorum amet velit accusamus consectetur quisquam, nisi fuga voluptatum quam officiis dolore perferendis accusantium provident reiciendis! Totam voluptatem aliquam molestias deleniti?
				Ipsum obcaecati dolores sint, quidem qui similique eveniet, quasi sed fugiat expedita iusto ut doloribus magnam magni veniam. Quisquam ipsum eligendi eius beatae nobis rem rerum voluptatum, distinctio voluptates non?</p>
			</div>
		)
	}
}