<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h4>Eslint é um corretor de texto</h4>
    <br/>
    <h2>Regras de Negócio</h2>
    <ul>
      <li>
        <ol>
          <h3>Cartas</h3>
          <li>Cartas possuem Tipo e Restrições de acordo com o deck</li>
        </ol>
      </li>
      <li>
        <h3>Decks</h3>
        <ol>
          <li>Decks podem ser dos tipos Standard, Modern, Legacy ou Commander</li>
          <br/>
          <li>Decks Standard, Modern e Legacy tem um mínimo de 60 (6 para testes) cards, e decks de Commander possuem um mínimo de 100 (10 para teste) cards</li>
          <br/>
          <li>Decks Standard aceitam cartas de 2020 para frente, Modern aceita cartas de 2008 para frente e Commander e Legacy aceitam cartas de qualquer ano</li>
          <br/>
          <li>Decks Standard, Modern e Legacy podem ter até quatro cópias de cada carta, porém apenas uma cópia se a carta for restrita</li>
          <br/>
          <li>Decks de Commander só podem ter um cópia de cada carta, e uma das cartas tem que ser o Comandante do deck</li>
          <br/>
          <li>Decks podem ter quantas cartas do tipo "Terreno Básico" ("Basic_Land") quiserem</li>
          <br/>
          <li>Decks não podem usar cartas banidas em seu formato</li>
          <br/>
          <li>Decks não podem ser criados sem dono</li>
        </ol>
      </li>
      <li>
        <h3>Usuário</h3>
        <ol>
          <li>Usuários podem ter quantos deck quiserem</li>
          <br/>
          <li>Quando um usuário é deletado, todos os seus deck são deletador junto</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
