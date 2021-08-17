<template>
  <section>
    <h1 class="aboutTheSystem__tittle">
      Інформація про персоналізований блог живого спілкування
    </h1>
    <ul class="aboutTheSystem__items">
      <li class="aboutTheSystem__item">
        <div class="aboutTheSystem__item_left">
          <img src="../../assets/images/iconItem.svg" alt="" />
        </div>
        <div class="aboutTheSystem__item_right">
          <p>
            Перетвори свій відпочинок разом
            <br />
            з {{title}}
          </p>
          <nuxt-link to="/for_clients"> Детальніше </nuxt-link>
        </div>
      </li>
      <li class="aboutTheSystem__item">
        <div class="aboutTheSystem__item_left">
          <img src="../../assets/images/salon-icon.svg" alt="" />
        </div>
        <div class="aboutTheSystem__item_right">
          <p>
            {{title}} для
            <b>
              усіх <br />
              охочих</b
            >
          </p>
          <nuxt-link to="/for_clients"> Детальніше </nuxt-link>
        </div>
      </li>
      <li class="aboutTheSystem__item">
        <div class="aboutTheSystem__item_left">
          <img src="../../assets/images/free-icon-level-4833200.svg" alt="" />
        </div>
        <div class="aboutTheSystem__item_right">
          <p>Зручність для тебе та твоїх друзів</p>
          <nuxt-link to="/for_clients"> Детальніше </nuxt-link>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "NIKKI - BLOG",
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  max-width: 78rem;
  padding-top: 15px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  .aboutTheSystem__tittle {
    padding-top: 40px;
    padding-bottom: 24px;
    font-size: 20px;
    text-transform: uppercase;
  }
  .aboutTheSystem__items {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 70px;
    padding: 0;
    list-style: none;
    .aboutTheSystem__item:nth-child(2) {
      margin: 0 32px;
    }
    .aboutTheSystem__item {
      -ms-flex: 1;
      flex: 1;
      display: -ms-flexbox;
      display: flex;
      padding: 16px 16px 22px;
      min-width: 30%;
      background: #fff;
      border-radius: 10px;
      -webkit-box-shadow: 0 2px 4px 0 rgb(25 52 58 / 24%);
      box-shadow: 0 2px 4px 0 rgb(25 52 58 / 24%);
      -webkit-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      transition: all 0.3s ease;
      .aboutTheSystem__item_left {
        img {
          width: 64px;
          margin-right: 1rem;
        }
      }
      .aboutTheSystem__item_right {
        a {
          background-color: transparent;
          text-decoration: none;
          font-weight: 600;
          color: rgba(25, 52, 58, 0.64);
          -webkit-transition: color 0.3s ease;
          -o-transition: color 0.3s ease;
          transition: color 0.3s ease;
        }
        a:hover {
          color: #19343a;
        }
      }
    }
  }
  .aboutTheSystem__item:hover {
    -webkit-box-shadow: 0 8px 16px 0 rgb(25 52 58 / 24%);
    box-shadow: 0 8px 16px 0 rgb(25 52 58 / 24%);
  }
}
</style>