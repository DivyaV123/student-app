import { defineStore } from 'pinia'
import * as styles from '@/styles'
import { darkModeKey, styleKey } from '@/config'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* Styles */
    style: '',
    htmlStyle: '',
    bodyStyle: '',
    lightBorderStyle: '',
    lightBgStyle: '',
    asideStyle: '',
    asideBrandStyle: '',
    asideMenuCloseLgStyle: '',
    asideMenuLabelStyle: '',
    asideMenuItemStyle: '',
    asideMenuItemActiveStyle: '',
    asideMenuItemActiveBgStyle: '',
    asideMenuItemInactiveStyle: '',
    asideSubmenuListStyle: '',
    asideSecondaryStyle: '',
    navBarItemLabelStyle: '',
    navBarItemLabelHoverStyle: '',
    navBarItemLabelActiveColorStyle: '',
    navBarMenuListUpperLabelStyle: '',
    tableTrStyle: '',
    tableTrOddStyle: '',
    overlayStyle: '',

    /* User */
    user:null,
    groups:null,
    loggedIn: false,
    loginError: '',
    isStudent: false,
    isTrainer: false,
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: true,

    /* Aside */
    isAsideVisible: false,
    isAsideCompact: false,
    isAsideMobileExpanded: false,
    secondaryMenu: null,
    isAsideHiddenLayout: false,

    /* AsideRight */
    isAsideRightActive: false,

    /* Layout */
    isBoxedLayout: false,
    isXl: false,
    isLg: false,
    isMd: false,

    /* SnackBar */
    messages: [],

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
    products: [],
    updates: [],
    updatesStatus: false,

    /* page title*/
    pageTitle: "",
  }),
  actions: {
    setPageTitle(title) {
      this.pageTitle = title
    },
    setUser (payload) {
      if (payload.name) {
        this.userName = payload.name
      }
      if (payload.email) {
        this.userEmail = payload.email
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar
      }
    },

    setStyle (payload) {
      if (!styles[payload]) {
        return
      }

      this.style = payload

      const style = styles[payload]

      document.body.className = style.body

      if (this.htmlStyle) {
        document.documentElement.classList.remove(this.htmlStyle)
      }

      if (style.html) {
        document.documentElement.classList.add(style.html)
      }

      if (localStorage[styleKey] !== payload) {
        localStorage.setItem(styleKey, payload)
      }

      for (const key in style) {
        this[`${key}Style`] = style[key]
      }
    },

    asideCompactToggle (payload = null) {
      this.isAsideCompact = payload !== null ? payload : !this.isAsideCompact

      document.documentElement.classList[this.isAsideCompact ? 'add' : 'remove']('aside-compact')
    },

    asideRightToggle (payload = null) {
      this.isAsideRightActive = payload !== null ? payload : !this.isAsideRightActive

      document.documentElement.classList[this.isAsideRightActive ? 'add' : 'remove']('m-clipped', 'mobile-aside-right-active')
    },

    asideMobileToggle (payload = null) {
      this.isAsideMobileExpanded = payload !== null ? payload : !this.isAsideMobileExpanded

      document.documentElement.classList[this.isAsideMobileExpanded ? 'add' : 'remove']('m-clipped', 'mobile-aside-active')
    },

    asideHiddenLayoutToggle (payload = null) {
      this.isAsideHiddenLayout = payload !== null ? payload : !this.isAsideHiddenLayout

      this.asideVisibilityToggle(!this.isAsideHiddenLayout)
    },

    asideVisibilityToggle (payload = null) {
      this.isAsideVisible = payload !== null ? payload : !this.isAsideVisible
    },

    fullScreenToggle (payload) {
      this.isFullScreen = payload

      if (!this.isAsideHiddenLayout) {
        this.isAsideVisible = !payload
      }

      document.documentElement.classList[payload ? 'add' : 'remove']('form-screen')
    },

    responsiveLayoutControl (isFullScreen) {
      if (isFullScreen || this.isFullScreen) {
        return
      }

      const previousIsXl = this.isXl

      this.isXl = window.innerWidth >= 1280
      this.isLg = window.innerWidth >= 1024
      this.isMd = window.innerWidth >= 768

      if (this.isXl) {
        if (!previousIsXl) {
          this.asideCompactToggle(true)
        }

        this.asideHiddenLayoutToggle(false)
      } else if (this.isLg) {
        this.asideCompactToggle(false)
        this.asideHiddenLayoutToggle(true)
      } else {
        this.asideCompactToggle(false)
        this.asideHiddenLayoutToggle(false)
      }
    },

    pushMessage (text) {
      this.messages.push({ ts: Date.now(), text })
    },

    shiftMessage () {
      this.messages.shift()
    },

    setDarkMode (payload = null) {
      const value = payload !== null ? payload : !this.darkMode

      document.documentElement.classList[value ? 'add' : 'remove']('dark')

      localStorage.setItem(darkModeKey, value ? '1' : '0')

      this.darkMode = value
    },
    // async login(data){
    //   try {
    //     const response = await axios.post('https://v2.qspiders.com/users/new-login/', data);
    //     if (response.status === 200) {
    //       const groups = response.data.groups
    //       const result = groups.some(element => {
    //         if (element.name === "student") {
    //             this.isStudent = true
    //         }
    //         if (element.name === "trainer") {
    //             this.isTrainer = true
    //         }
    //     });
    //       this.$patch({
    //         user: response.data,
    //         loggedIn: true,
    //         loginError: ''
    //     })
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }
    //     else {
    //       this.pushMessage("Login failed, please check your username and password")
    //     }
  
    //   } catch (err) {
    //     console.log(err)
    //     this.pushMessage("Login failed, please check your username and password")
    //   }
    // },
//     async logout() {
//       const token = this.user.token
//       const data = {}
//       if (token) {
//           const headers = {
//               'Authorization': `Token ${token}`
//           }
//           try {
//               // Cookies.remove('user', { domain: '.qspiders.com' })
//               localStorage.removeItem("user");
//               this.$patch({
//                   user: null,
//                   loggedIn: false,
//                   loginError: ''
//               })
//               await axios.post('https://v2.qspiders.com/users/logout/', data, {
//                   headers: headers
//               });
//               return true
//           }
//           catch (err) {
//               return false
//           }

//       }
//   },
//   async checkUser() {
//     try {
//       if (this.user === null) {
//         var user = JSON.parse(localStorage.getItem("user"))
//         if(user && user.name){
//           const groups = user.groups
//           const result = groups.some(element => {
//             if (element.name === "student") {
//                 this.isStudent = true
//             }
//             if (element.name === "trainer") {
//                 this.isTrainer = true
//             }
//         });
//           this.$patch({
//             user: user,
//             loggedIn: true,
//             loginError: ''
//         })
//         }
//       }
//     }
//     catch (err) {
//       localStorage.removeItem("user");
//       this.logout();
//     }

//   },
    fetch (sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data) {
            if (r.data.data) {
              this[sampleDataKey] = r.data.data
            }
            if (r.data.status) {
              this[`${sampleDataKey}Status`] = r.data.status
            }
          }
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
})
