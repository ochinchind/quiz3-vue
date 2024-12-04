
<template>
  <div class="index-page">
    <div v-if="isModalOpen" class="drawer" @click.self="closeModal">
    <div class="drawer-content" style="">
        <div @click="closeModal" class="drawer-menu" style="">Menu</div>
        <ul style="background: #FFFFFF; padding: 1rem 0rem; border-radius: 12px; margin-top: 1rem;">
        <li v-for="topic in topics" :key="topic" @click="filterByTopic(topic)" class="drawer-li" style="">
            {{ topic }}
        </li>
        </ul>
        <div style="" class="drawer-all-list">
            <div class="drawer-all-list-contact" style="">
                CONTACTS
            </div>
            <div style="" class="drawer-all-list-div">PHONE: +1(234)-23-45-22</div>
            <div style="" class="drawer-all-list-div">ADDRESS: Green st., Yalow 
                park</div>
            <div style="" class="drawer-all-list-div">EMAIL: Yallow@park.info</div>
        </div>
    </div>
    </div>

    <div v-show="showLoginModal" class="modal" @click.self="closeLoginModal">
      <div class="modal-content">
        <span class="close" @click="closeLoginModal">&times;</span>
        <h2 style="" class="modal-login">Login</h2>
        <div class="modal-body" style="">
          <UForm @submit="LoginSubmit" :schema="schemaLogin" :state="stateLogin" >
            <UFormGroup  name="username">
                <UInput style="" class="modal-input" v-model="stateLogin.username" type="text" placeholder="Enter username" />
            </UFormGroup>
            <UFormGroup  name="password">
                <UInput class="modal-input" v-model="stateLogin.password" type="password" placeholder="Enter password" />
            </UFormGroup>
            <div style="" class="mt-2">
              <button @click="toggleForgetPasswordModal" type="button" style="" class="modal-forgot-btn">FORGOT PASSWORD?</button>
            </div>
            <div class="mt-2">
                <UButton type="submit" style="" class="modal-btn-auth">
                    AUTHORIZE
                </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>

    <div v-show="showForgetPasswordModal"  class="modal" style="z-index: 9999999;" @click.self="closeForgetPasswordModal">
      <div style="background: linear-gradient(180deg, #62F0E8 0%, #50BEB7 60%, #2F8781 100%);max-width: 1000px; " class="modal-content">
        <span class="close" @click="closeForgetPasswordModal">&times;</span>
        <div class="modal-body" style="">
            <div class="modal-heading" style=" ">
                <div class="modal-heading-title" style="">
                To get access to your account do next steps
              </div>
            </div>

            <div style="" class="modal-content-wrapper">
              <div class="modal-content-wrapper-text">Write your email</div>
              <div class="modal-content-wrapper-text-text">
                <input type="text" name="email" id="emailForgetInput">
              </div>
            </div>

          <div class="modal-content-wrapper">
            <div style="">Send code to email</div>
            <div class="modal-content-wrapper-text-text"><button @click="sendForgetPasswordToEmail" :disabled="isLoadingForgetPassword" style="background: #D6E343; color: black; padding: 1rem;
">{{ isLoadingForgetPassword ? 'Loading...' : 'Send' }}</button></div>
          </div>

          <div class="modal-content-wrapper">
            <div class="modal-content-wrapper-text">ENTER THE SECRET PHRASE</div>
            <div class="modal-content-wrapper-text-text"><input ref="secretPhraseInput" id="secretPhraseForgetPasswordInput" name="secret_phrase" type="password" placeholder="******" style="background: #44B3D6; color: white;
"></div>
</div>
          <div class="modal-content-wrapper">
            <div class="modal-content-wrapper-text">ENTER THE NEW PASSWORD</div>
            <div class="modal-content-wrapper-text-text"><input ref="secretPhraseInput" id="newPasswordInputForget" name="password" type="password" placeholder="******" style="background: #44B3D6; color: white;
"></div>
          </div>
          <div class="modal-content-btn-wrapper">
                <button @click="changePasswordForget" :disabled="isLoadingForgetChangePassword" class="modal-content-btn-wrapper-btn">{{ isLoadingForgetChangePassword ? 'Loading...' : 'Change password' }}</button>
            </div>
        </div>
      </div>
    </div>

    <header class="header-wrapper" style="background: #FFFFFFBD; padding: 1rem;">
        <div class="header" style="display:flex; justify-content: space-between;">
            <button @click="toggleModal" class="" style="border:none; background: none; cursor: pointer;">
                <img src="/static/burger.png" style="width: 50px; height:50px;">
            </button>
            <div class="" style="background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);padding: 1rem 16rem; border-radius: 5%;">
                <div class="" style="background: linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
            -webkit-background-clip: text;
            color: transparent; font-weight: 700; font-size: larger;">
                    New trips on Fall season! Full details on our Instagram accounts.
                </div>
            </div>
            <div v-if="!isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
              <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                <img src="/static/img/avatar.png" style="width: 30px; height:30px;">
              </div>

              <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                <li @click="toggleLoginModal">Login</li>
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/register">Register </NuxtLink></li>
              </ul>
            </div>

            <div v-if="isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
              <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                <img src="/static/img/avatar.png" style="width: 30px; height:30px;">
              </div>

              <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" :to="`/profile/${authUserId}`">My profile </NuxtLink></li>
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/favorites">Favorites </NuxtLink></li>
                <li @click="logout">Logout</li>
              </ul>
            </div>
        </div>
    </header>

    <header class="mob-header-wrapper">
      <div 
          class="" 
          style="background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%); padding:1rem; border-radius: 5%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;">
          <div 
              class="" 
              style="background: linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
          -webkit-background-clip: text;
          color: transparent; font-weight: 700; font-size: larger;">
              New trips on Fall season! Full details on our Instagram accounts.
          </div>
      </div>
      <div v-if="!isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
              <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                <img src="/static/img/avatar.png" style="width: 30px; height:30px;     max-width: fit-content;">
              </div>

              <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                <li @click="toggleLoginModal">Login</li>
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/register">Register </NuxtLink></li>
              </ul>
            </div>

            <div v-if="isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
              <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                <img src="/static/img/avatar.png" style="width: 30px; height:30px; max-width: fit-content;">
              </div>

              <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" :to="`/profile/${authUserId}`">My profile </NuxtLink></li>
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/favorites">Favorites </NuxtLink></li>
                <li @click="logout">Logout</li>
              </ul>
            </div>
      
    </header>


    <div class="wrapper-main" style="display: flex; flex: center; justify-content: center;">
        <div class="hexagon-div">
            <!-- Header Section -->

            <div class="header" style="text-align: left; margin-top: 10rem;">
                <div class="date">
                    <div class="border-blue" style="box-shadow: 0px 0px 15px #5BB9CD;" >
                        13.09.2024
                    </div>
                </div>
                <div style="display: flex;
        justify-content: space-between;
        align-items: center; margin-top: 2rem;">
                <div class="border-blue" style=" font-size: 2.5rem;">
                    {{ selectedTopic }}
                </div>
                <div class="filter" @click="toggleDropdown"  ref="dropdown" style="position: relative;">
                  <div class="dropdown-toggle" :class="{ open: isOpen }">
                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/filter--v1.png" alt="filter--v1" />
                    <span style="margin-left: 1rem;">{{ selectedLabel }}</span> &#9660;
                  </div>

                  <ul v-if="isOpen" class="dropdown-menu">
                    <li @click="selectFilter('rating')">Rating</li>
                    <li @click="selectFilter('pubDate')">Publication Date</li>
                  </ul>
                </div>
                <button @click="previousPage" :disabled="currentPage === 1" style="color: white; cursor: pointer; border: none; background: none;">
                  <img style="  transform: rotate(180deg);
    transition: transform 0.5s ease;" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/arrow-pointing-left.png" alt="back-arrow" />
                  <div>
                      {{ currentPage }} / {{ totalPages }}
                  </div>
              </button>
                <button @click="nextPage" :disabled="currentPage >= totalPages" style="color: white; cursor: pointer; border: none; background: none;">
                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/arrow.png" alt="arrow"/>
                    <div>
                        {{ currentPage }} / {{ totalPages }}
                    </div>
                </button>
                </div>
            </div>

            <div class="reviews">
                <div  v-for="person in paginatedPersons" :key="person.id"  class="review-card">
                    <div class="review-details">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="background: #FFFFF526; padding: 0.5rem; text-align: start;">
                                <p><strong>{{ person.PersonName }}</strong> </p>
                                <p>{{ formatDateTime(new Date(person.PubDate)) }}</p>
                            </div>
                            <div>
                                <p><strong>Rating</strong> </p>
                                <p class="rating">
                                  <span class="stars" :style="getStarStyle(person.Rating)">
  ★★★★★
</span>
                                </p>
                            </div>
                            <img :src="person.Avatar" :alt="person.PersonName" width="50" height="50">
                        </div>
                        <p style="word-break: break-all;">{{ person.Commentary }}</p>
                        <div style="display: flex; justify-content: end;">
                        <button class="like-button" @click="incrementStars(person)">LIKE</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


  <div class="mob-wrapper-main" style="display: flex; flex: center; justify-content: center;">
        <div class="mob-hexagon-div">
            <!-- Header Section -->

            <div class="header" style="text-align: left; margin-top: 10rem;">
                <div class="date">
                    <div class="border-blue" style="box-shadow: 0px 0px 15px #5BB9CD;" >
                        13.09.2024
                    </div>
                </div>
                <div style="display:block; margin-top:1rem;">
                  <div style="display: flex; justify-content: space-between;">
                    <div class="border-blue" style=" font-size: 2.5rem;">
                        {{ selectedTopic }}
                    </div>
                    <div class="filter" @click="toggleDropdown"  ref="dropdown" style="position:relative; margin-top: 1rem; margin-bottom: 1rem;">
                      <div class="dropdown-toggle" :class="{ open: isOpen }">
                        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/filter--v1.png" alt="filter--v1" />
                        <span style="margin-left: 1rem;">{{ selectedLabel }}</span> &#9660;
                      </div>

                      <ul v-if="isOpen" class="dropdown-menu">
                        <li @click="selectFilter('rating')">Rating</li>
                        <li @click="selectFilter('pubDate')">Publication Date</li>
                      </ul>
                    </div>
                  </div>
                <div style="display: flex; justify-content: space-between;">
                  <button @click="previousPage" :disabled="currentPage === 1" style="color: white; cursor: pointer; border: none; background: none;">
                    <img style="  transform: rotate(180deg);
      transition: transform 0.5s ease;" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/arrow-pointing-left.png" alt="back-arrow" />
                    <div>
                        {{ currentPage }} / {{ totalPages }}
                    </div>
                </button>
                  <button @click="nextPage" :disabled="currentPage >= totalPages" style="color: white; cursor: pointer; border: none; background: none;">
                      <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/arrow.png" alt="arrow"/>
                      <div>
                          {{ currentPage }} / {{ totalPages }}
                      </div>
                  </button>
                </div>
                </div>
            </div>

            <div>
                <div  v-for="person in paginatedPersons" :key="person.id"  class="review-card">
                    <div class="review-details">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="background: #FFFFF526; padding: 0.5rem; text-align: start;">
                                <p><strong>{{ person.PersonName }}</strong> </p>
                                <p>{{ formatDateTime(new Date(person.PubDate)) }}</p>
                            </div>
                            <div>
                                <p><strong>Rating</strong> </p>
                                <p class="rating">
                                  <span class="stars" :style="getStarStyle(person.Rating)">
  ★★★★★
</span>
                                </p>
                            </div>
                            <img :src="person.Avatar" :alt="person.PersonName" width="50" height="50">
                        </div>
                        <p style="word-break: break-all;">{{ person.Commentary }}</p>
                        <div style="display: flex; justify-content: end;">
                        <button class="like-button" @click="incrementStars(person)">LIKE</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>

  <div class="mob-footer-sticky" style="position: sticky; bottom: 0; background: linear-gradient(90deg, #A7D759 0%, #84963C 100%); height: 50px;">
    <div style="display:flex; text-align: center; justify-content: center; ">
      <a v-if="isAuth" :href="`/friends/${authUserId}`" style="display: flex; justify-content: center; align-items: center; width: 33.33%; cursor: pointer;">
        <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" style="width:40px; height: 40px;" alt="home" />
      </a>
      <div @click="toggleModal" style="display: flex; justify-content: center; align-items: center; width: 33.33%; cursor: pointer;">
        <img src="https://cdn-icons-png.flaticon.com/512/3502/3502685.png" style="width:40px; height: 40px;" alt="plus" />
      </div>
      <a v-if="isAuth" href="/favorites" style="display: flex; justify-content: center; align-items: center; width: 33.33%; cursor: pointer;">
        <img src="https://cdn-icons-png.flaticon.com/512/126/126471.png" style="width:40px; height: 40px;" alt="user" />
      </a>
    </div>
  </div>

</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'



const schemaLogin = object({
  username: string().required('Username is required').max(255, 'Maximum 255 characters'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
})

type SchemaLoginType = InferType<typeof schemaLogin>

const stateLogin = reactive({
  username: undefined,
  password: undefined
})


</script>

<script lang="ts">
import _ from 'lodash';
import { format, formatDistanceToNowStrict, isToday } from 'date-fns';
import { showLoginModal, toggleLoginModal, closeLoginModal } from '~/scripts/loginModal'
import { isAuth, authUserId, authJwtToken, trueIsAuth, toggleIsAuth, changeIsAuth, falseIsAuth, authUserIdChange, authJwtTokenChange, logout, showForgetPasswordModal, toggleForgetPasswordModal, closeForgetPasswordModal, isLoadingForgetPassword, sendForgetPasswordToEmail, isLoadingForgetChangePassword, changePasswordForget, SendLastActivity } from '~/scripts/auth'

interface Person {
  id: number;
  PersonName: string;
  Avatar: string;
  PubDate: string;
  Rating: number;
  Commentary: string;
  Topic: string;
  Stars: number;
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      persons: [
        { id: 1, PersonName: 'Vladimir', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 2, PersonName: 'Marlen', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 3, PersonName: 'JackJones', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 1, Commentary: 'Great product! Very Bad no way  no buying that s not good !', Topic: 'IT', Stars: 0 },
        { id: 4, PersonName: 'Michael', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 5, PersonName: 'Jaseh', Avatar: '/static/img/avatar.png', PubDate: '2024-09-16', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 6, PersonName: 'Onfroy', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 4, Commentary: 'Great product!', Topic: 'AI', Stars: 0 },
        { id: 7, PersonName: 'Billie', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 8, PersonName: 'Henry', Avatar: '/static/img/avatar.png', PubDate: '2024-09-18', Rating: 2, Commentary: 'Great product!', Topic: 'VR', Stars: 0 },
        { id: 9, PersonName: 'Shahboz', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 10, PersonName: 'Nikolai', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 11, PersonName: 'Tima', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 12, PersonName: 'Timur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 13, PersonName: 'Temirlan', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 14, PersonName: 'Serafim', Avatar: '/static/img/avatar.png', PubDate: '2024-08-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 15, PersonName: 'Steven', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 16, PersonName: 'Maks', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 17, PersonName: 'Akniet', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 18, PersonName: 'Baur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 19, PersonName: 'Ainur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 20, PersonName: 'Hawkin', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
      ] as Person[],
      filteredPersons: [
        { id: 1, PersonName: 'Vladimir', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 2, PersonName: 'Marlen', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 3, PersonName: 'JackJones', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 1, Commentary: 'Great product! Very Bad no way  no buying that s not good !', Topic: 'IT', Stars: 0 },
        { id: 4, PersonName: 'Michael', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 5, PersonName: 'Jaseh', Avatar: '/static/img/avatar.png', PubDate: '2024-09-16', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 6, PersonName: 'Onfroy', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 4, Commentary: 'Great product!', Topic: 'AI', Stars: 0 },
        { id: 7, PersonName: 'Billie', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 8, PersonName: 'Henry', Avatar: '/static/img/avatar.png', PubDate: '2024-09-18', Rating: 2, Commentary: 'Great product!', Topic: 'VR', Stars: 0 },
        { id: 9, PersonName: 'Shahboz', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 10, PersonName: 'Nikolai', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 11, PersonName: 'Tima', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 12, PersonName: 'Timur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 13, PersonName: 'Temirlan', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 14, PersonName: 'Serafim', Avatar: '/static/img/avatar.png', PubDate: '2024-08-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 15, PersonName: 'Steven', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 16, PersonName: 'Maks', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 17, PersonName: 'Akniet', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 18, PersonName: 'Baur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 19, PersonName: 'Ainur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
        { id: 20, PersonName: 'Hawkin', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
      ] as Person[],
      topics: ['IT', 'AI', 'VR'],
      selectedTopic: 'IT',
      currentPage: 1,
      itemsPerPage: 4,
      sortByRating: true,
      isModalOpen: false,
      isOpenAuth: false,
      isOpen: false,
      selectedFilter: 'rating',
      options: {
        rating: 'Rating',
        pubDate: 'Publication Date'
      }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPersons.length / this.itemsPerPage);
    },
    paginatedPersons() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredPersons.slice(startIndex, endIndex);
    },
    selectedLabel() {
      return this.options[this.selectedFilter];
    }
  },
  mounted() {
    this.filteredPersons = this.persons.filter(person => person.Topic === 'IT');
    document.addEventListener('click', this.handleClickOutside);

    const topicParameter = this.$route.query.topic;

    this.selectFilter('rating');
    if (topicParameter && this.topics.includes(topicParameter)) {
      this.filterByTopic(topicParameter);
    } else {
      this.filterByTopic(this.selectedTopic);
    }
    var isAuthValue = localStorage.getItem('isAuth');
    var authJwtTokenValue = localStorage.getItem('jwtToken');
    authUserIdChange(isAuthValue ?? '');
    changeIsAuth(isAuthValue !== null && !isNaN(Number(isAuthValue)));
    authJwtTokenChange(authJwtTokenValue ?? '');
    if (authJwtToken.value !== null && authJwtToken.value !== '') {
          SendLastActivity();
      }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);

  },
  methods: {
    async LoginSubmit(event: FormSubmitEvent<SchemaLoginType>) {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(event.data),
            });

            const result = await response.json();
            if (result.success) {
                alert('Logged successful!');
                localStorage.setItem('isAuth', result.userId);
                localStorage.setItem('jwtToken', result.token);
                trueIsAuth();
                authUserIdChange(result.userId);
                authJwtTokenChange(result.token);
                closeLoginModal();
            } else {
                alert('Failed to login.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    },
    filterByRatingOrDate() {
      if (this.selectedFilter == 'pubDate') {
        this.filteredPersons = _.orderBy(this.filteredPersons, ['PubDate'], ['desc']);
        
      } else {
        this.filteredPersons = _.orderBy(this.filteredPersons, ['Rating'], ['desc']);
      }

    },
        previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdownAuth() {
      this.isOpenAuth = !this.isOpenAuth;
    },
    selectFilter(option: any) {
      this.selectedFilter = option;
      this.isOpen = false; 
      this.currentPage = 1;
      this.filterByRatingOrDate();
    },
    getStarStyle(rating: any) {
      let startColor;
      if (rating <= 1) {
        startColor = '#ff0000'; // Red
      } else if (rating <= 2) {
        startColor = '#ff6f00'; // Orange
      } else if (rating <= 3) {
        startColor = '#ffb904'; // Orange-yellow
      } else if (rating <= 4) {
        startColor = '#ffe234'; // Almost yellow
      } else {
        startColor = '#ffff00'; // Full yellow
      }

      const percentage = (rating * 100) / 5; 

      return {
        background: `linear-gradient(90deg, ${startColor} 0%, ${startColor} ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`,
        '-webkit-background-clip': 'text',
        'color': 'transparent',
      };
    },
    handleClickOutside(event: any) {
      const dropdown = this.$refs.dropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.isOpen = false;
      }
      const dropdownAuth = this.$refs.dropdownAuth;
      if (dropdownAuth && !dropdownAuth.contains(event.target)) {
        this.isOpenAuth = false;
      }
      
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    filterByTopic(topic: any) {
      this.filteredPersons = this.persons.filter(person => person.Topic === topic);
      this.selectedTopic = topic;
      this.currentPage = 1;
      this.closeModal();
    },
    formatDateTime(date: any) {
      if (isToday(date)) {
        return `Today, ${format(date, 'HH:mm')}`;
      } else {
        return `${formatDistanceToNowStrict(date, { addSuffix: true })}, ${format(date, 'HH:mm')}`;
      }
    },
    stars(rating: any) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;

      return '⭐'.repeat(fullStars) + (halfStar ? '⭐½' : '') + '☆'.repeat(emptyStars);
    },
    incrementStars(person: any) {
      if(person.Rating < 4.9) {
        person.Rating += 0.1;

            this.filterByRatingOrDate();
      }
    }
  }
}
</script>

<style>
.index-page {
    font-family: Arial, sans-serif;
    background: url('/static/img/background.png') no-repeat center center fixed; 
    background-size: cover;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  display: block; /* Show the modal */
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(0,0,0,0.4);
}

.modal-body {
  align-items: center; text-align: center; justify-content: center;  padding: 20px;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}
.form-group {
  margin-bottom: 1rem;
}

.container {
    background-color: white;
    border-radius: 15px;
    width: 80%;
    max-width: 1200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.date {
    font-size: 2em;
    color: #4b9cd3;
}
.filter {
    background: #EEFCF7;
    font-size: 2rem;
    font-weight: 900;
    color: #a6e168;
    cursor: pointer;
    padding: 0rem 1rem;
}

.dropdown-toggle {
  background: #EEFCF7;
  font-size: 2rem;
  font-weight: 900;
  color: #a6e168;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
}

.dropdown-toggle.open {
  background-color: #d1f2eb; 
}

.dropdown-menu {
  position: absolute;
  top: 3rem; 
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-menu li {
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 900;
  color: #555;
  cursor: pointer;
  background-color: #EEFCF7;
}

.dropdown-menu li:hover {
  background-color: #d1f2eb;
  color: #333;
}
.reviews {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.review-card {
    background: #5BB9CD;
    border-radius: 10px;

    margin: 10px 0;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    color: white;
}
@media (max-width: 1280px) {
  .review-card {
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .review-card {
    width: 45%;
  }
}

.review-card img {
    border-radius: 50%;
    margin-right: 20px;
}
.review-details {
    flex-grow: 1;
}
.review-details p {
    margin: 5px 0;
}
.rating {
    color: #ffcc00;
}
.stars {
  font-size: 1.5em;
    letter-spacing: 6px;
    background: -webkit-gradient(linear, left top, right top, color-stop(0, #ffb904), color-stop(55%, #ffb904), color-stop(0, #e4e4e4), to(#e4e4e4));
    background: linear-gradient(90deg, #ffb904 0, #ffb904 55%, #e4e4e4 0, #e4e4e4 100%);
    -webkit-background-clip: text;
    color: transparent;
    line-height: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.like-button {
    background-color: #a6e168;
    padding: 10px;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
}

.hexagon-div {
    width: 1200px;
    height: 1000px;
    background: linear-gradient(180deg, #FEFEFE 0%, #CED2D2 40%, #C1C5C5 62%, #B8BBBB 100%);
    clip-path: polygon(50% 10%, 100% 15%, 100% 85%, 50% 80%, 0% 85%, 0% 15%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.mob-hexagon-div {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        180deg, 
        rgba(254, 254, 254, 0.8) 0%, 
        rgba(206, 210, 210, 0.8) 40%, 
        rgba(193, 197, 197, 0.8) 62%, 
        rgba(184, 187, 187, 0.8) 100%
    );
    padding: 20px;
}

.border-blue {
    background: #5BB9CD; color: white; padding: 0rem 1rem; width: 200px; border-radius: 8px;
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  z-index: 99999;
}

.drawer-content {
  background-color: white;
  padding: 20px;
  width: 300px;
  height: 100vh;
  text-align: center;
  background: #C1EBF1;
  overflow: scroll;
}

.drawer-menu {
  background: #FFFFFF; color: black; padding: 1rem; font-size: 2rem; border-radius: 10px; cursor: pointer;
}

.drawer-li {
  background: linear-gradient(90deg, #4CD87C 0%, #42D669 63.42%, #3DD55E 100%); padding: 1rem; color: white; font-size: 2rem; 
}

.drawer ul {
  list-style: none;
  padding: 0;
}

.drawer ul li {
  cursor: pointer;
  margin: 10px 0;
  color: #007BFF;
}

.drawer ul li:hover {
  text-decoration: underline;
}

.drawer-all-list {
  margin-top: 3rem; background: linear-gradient(180deg, #AFF090 0%, #45C330 100%); padding: 1rem; color: white;font-size: 1.5rem; text-align: left
}

.drawer-all-list-contact {
  margin-bottom: 1rem; text-align: center;
}

.drawer-all-list-div {
  margin-bottom: 1rem;
}

.modal-login {
  text-align: center;
  color: white;
  padding: 20px;
  background: #75C2FA;
  margin: 0;
}

.modal-input {
  background: white; color: black; font-size: 2rem; margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 2rem;
}

.modal-forgot-btn {
  background: white; font-size: 1rem; color: black; border: 1px black solid; padding: 1.5rem;
}

.modal-btn-auth {
  background: lime; padding: 2rem; border-radius: 2rem;
}

.modal-heading {
  display: flex;     flex-direction: column; align-items: center; text-align: center; justify-content: center;
}

.modal-heading-title {
  background: white; padding: 2rem; width: 400px;
}

.modal-content-wrapper {
  display: flex; margin-top: 2rem;
}

.modal-content-wrapper-text {
  width: 50%; color: white; font-size: 1.5rem;
}

.modal-content-wrapper-text-text {
  width: 50%; font-size: 1.5rem;
}

.modal-content-btn-wrapper {
  display: flex;     flex-direction: column; align-items: center; text-align: center; justify-content: center; margin-top: 2rem;
}

.modal-content-btn-wrapper-btn {
  background: #44B3D6; padding: 1rem; color:white;
}

.header-wrapper {
  display: none;
}

@media (min-width: 1280px) {
  .header-wrapper {
    display: block;
  }
}

@media (max-width: 1280px) {
  .wrapper-main {
    display: none!important;
  }
}

.mob-header-wrapper {
  display:flex;
  background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);
}

@media (min-width: 1280px) {
  .mob-header-wrapper {
    display: none!important;
  }
}

.mob-wrapper-main {
  display: flex;
}

@media (min-width: 1280px) {
  .mob-wrapper-main {
    display: none!important;
  }
}


@media (min-width: 1280px) {
  .mob-footer-sticky {
    display: none!important;
  }
}
</style>
