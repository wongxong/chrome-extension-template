<template>
  <div :id="domId" class="app-root">
    <div class="panel-control-image" @click="togglePanel">
      <img src="../public/images/logo128.png" alt="ICON">
    </div>
    <transition name="slideFade">
      <div class="panel" v-show="displayPanel">
        <div class="panel-header">
          <span>V{{version}} -- Only Support Old Facebook Version</span>
          <template v-if="userInfo">
            <div class="user-info">
              <span>{{ userInfo.user_name }}</span>
              <span class="button-logout" @click="logout" title="Logout">
                <i class="el-icon-switch-button"></i>
              </span>
            </div>
          </template>
        </div>
        <div class="panel-body">
          <router-view></router-view>
        </div>
        <div
          class="panel-control" 
          @click="togglePanel">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { version } from '../public/manifest.json';
  import notifyMe from '@/utils/notifyMe';

  export default {
    name: 'App',
    computed: {
      ...mapState([
        'loading',
        'userInfo'
      ])
    },
    data() {
      return {
        domId: globalConfig.domId,
        version,
        displayPanel: false,
        panelControlClass: []
      }
    },
    methods: {
      logout() {},
      togglePanel() {
        this.displayPanel = !this.displayPanel;
      }
    },
    created() {
      this.$router.push('/sign_in');
      // notifyMe('4444444444');
    },
    mounted() {
      if(process.env.NODE_ENV === 'production') {
        this.$el.setAttribute('data-extension-id', chrome.runtime.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    * {
      box-sizing: border-box;
    }
  }

  .panel-control,
  .panel-control-image {
    position: fixed;
    z-index: 999999;
    top: 30%;
    background-color: #fff;
    cursor: pointer;
  }

  .panel-control-image {
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 0 10px 4px rgba(0,0,0,.2);

    img {
      display: block;
      width: 100%;
    }
  }

  .panel-control {
    right: 400px;
    width: 30px;
    height: 40px;
    line-height: 40px;
    border: 2px solid #ddd;
    text-align: center;
    font-size: 16px;
    border-right: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999999;
    width: 400px;
    background-color: #fff;
    box-shadow: 0 0 10px 4px rgba(0,0,0,.2);
    font-size: 14px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    padding: 10px 15px;
    border-bottom: 1px solid #e4e4e4;
  }

  .button-logout {
    margin-left: 6px;
    font-size: 16px;
    color: #409eff;
    cursor: pointer;
  }

  .panel-body {
    height: calc(100% - 40px);
    padding: 10px 15px;
  }

  .slideFade-enter,
  .slideFade-leave-to {
    opacity: 0;
    transform: translate(110%, 0);
  }

  .slideFade-enter-active,
  .slideFade-leave-active {
    transition: .25s;
  }

  .slideFade-enter-to,
  .slideFade-leave {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>