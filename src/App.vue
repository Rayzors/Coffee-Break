<template>
  <div id="app" v-cloak>
    <aside class="sidebar">
      <div class="sidebar__top" style="-webkit-app-region: drag">
        <router-link class="logo" to="/">Coffee Break</router-link>
      </div>
      <div class="sidebar__bottom">
        <nav>
          <ul class="menu-list" v-if="categories">
            <li>
              <router-link to="/" class="menu-list__link">Accueil</router-link>
            </li>
          </ul>
          <h2 class="category-title">Categories</h2>
          <ul class="menu-list" v-if="categories">
            <li v-for="({id, snippet: {title}}, i) of categories" :key="i">
              <router-link :to="`/category/${id}`" class="menu-list__link" :class="isActive(id)">{{ title }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <main class="main" ref="main">
      <div class="topbar">
        <div class="topbar__content">
          <button @click="$router.go(-1)" v-if="$route.path !== `/` && !$route.path.includes('/category/')" class="backButton">
            <svg id="icon-keyboard_arrow_left" viewBox="0 0 24 24">
              <title>keyboard_arrow_left</title>
              <path d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"></path>
            </svg>
          </button>
          <searchbar/>
        </div>
      </div>
      <transition name="slide-fade-up" mode="out-in" appear>
        <router-view :key="$route.fullPath" @currentVideoCategoryId="setCurrentCategory"></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar';

export default {
  name: 'yt-electron',
  components: { Searchbar },
  data() {
    return {
      categories: null,
      currentCategory: null,
    };
  },
  async created() {
    const { items: categories } = await this.getCategories();
    this.categories = categories.filter(({ snippet: { assignable } }) => assignable);
  },
  mounted() {
    this.$refs.main.scrollTop = 0;
  },
  watch: {
    $route(to, from) {
      if (to.path) {
        this.$refs.main.scrollTop = 0;
      }
      if (to.path.includes('/category/') || from.path.includes('/category/')) {
        this.currentCategory = to.params.categoryid || from.params.categoryid;
      } else {
        this.currentCategory = null;
      }
    },
  },
  methods: {
    setCurrentCategory(categoryId) {
      if (!this.currentCategory) {
        this.currentCategory = categoryId;
      }
    },
  },
  computed: {
    isActive() {
      return id => ((this.currentCategory === id) ? 'router-link-exact-active' : '');
    },
  },

};
</script>

<style lang="scss">

@font-face {
  font-family: "Open Sans";
  src: url(~@/assets/fonts/opensans/OpenSans-Regular.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: url(~@/assets/fonts/opensans/OpenSans-Bold.ttf) format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: url(~@/assets/fonts/opensans/OpenSans-Semibold.ttf) format("truetype");
  font-weight: 500;
  font-style: normal;
}

[v-cloak] {background: red;}
[v-cloak] > * { display:none }

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #fbfcfd;
  color: #121212;
  font-family: "Open Sans";
  font-size: 14px;
}

#app {
  display: flex;
  flex-flow: row wrap;
  height: 100vh;
}

.container.loader {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.05);

  &__content {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 0 10px;
    height: 60px;
    border-bottom: 1px solid darken(#fbfcfd, 3%);
  }

  &__titlebar {
    height: 20px;
    width: 100%;
    background: #fff;
    text-align: center;
    background: #ddd;
  }
}

.logo {
  color: rgba(#FF3E8F, 1);
  font-weight: bold;
  text-decoration: none;
  font-size: 20px;
}

.backButton {
  background: transparent;
  color: #fff;
  border: 0;
  padding: 5px;
  opacity: 0.5;
  cursor: pointer;
  transition: 260ms ease;

  svg {
    height: 4em;
    width: 4em;
    padding: 5px;
    color: #121212;
    fill: currentColor;
    stroke: currentColor;
  }

  &:hover {
    opacity: 1;
  }

  &:active,
  &:focus {
    outline: none;
  }
}

.searchbar {
  flex: 1;
  padding: 0 30px;
  height: 100%;

  input {
    border: 0;
    font-size: 16px;
    background: transparent;
    color: #121212;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    transition: 260ms ease;

    &:focus {
      outline: none;
    }
  }
}

.sidebar {
  height: 100vh;
  width: 25vw;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 4;
  border-right: 1px solid darken(#fbfcfd, 3%);
  // background: linear-gradient(-90deg, rgba(#FFBA8F, 1), rgba(#FF3E8F, 1));

  &__top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid darken(#fbfcfd, 3%);
  }

  &__bottom {
    padding: 50px 50px 50px 0;
    height: calc(100% - 60px);
    overflow: auto;
    background: #fff;
    // border-top-left-radius: 10px;
    // border-top-right-radius: 10px;

    .category-title {
      margin: 0 0 8px;
      padding-left: 50px;
    }
  }
}

.main {
  width: 75vw;
  // margin-top: 60px;
  overflow: auto;
  height: 100vh;
}

.menu-list {
  margin: 0 0 25px;
  padding: 0;
  list-style: none;

  li {
    border-radius: 0 10px 10px 0;
    // overflow: hidden;
  }

  &__link {
    width: 100%;
    display: inline-block;
    text-decoration: none;
    transition: 260ms ease;
    color: lighten(#121212, 20%);
    padding: 10px 10px 10px 50px;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 0;
    transition: transform 260ms ease-out, margin-bottom 260ms ease;

    &:hover {
      transform: scale(1.1);
    }

    &.router-link-exact-active {
      color:#fff !important;
      font-weight: bold;
      background: linear-gradient(-90deg, rgba(#FF3E8F, 1), rgba(#FFBA8F, 1));
      box-shadow: 0 24px 50px rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
    }
  }
}

.grid {
  width: 100%;
  display: grid;
  margin: 0;
  list-style: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 30px;
  padding: 50px;

  &.horizontal {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

    li {
      flex: 0 0 300px;
      padding: 25px;
    }
  }
}

.category-section {
  border-bottom: 1px solid darken(#fbfcfd, 3%);

  &:first-child {
    padding-top: 35px;
  }
}

.category-title {
  margin-left: 50px;
  margin-bottom: 0;
  font-size: 18px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-up-enter-active {
  transition: all .26s ease;
}
.slide-fade-up-leave-active {
  transition: all .26s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-up-enter, .slide-fade-up-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

[id^="icon-"] {
  width: 1em;
  height: 1em;
  margin-right: 10px;
}

</style>
