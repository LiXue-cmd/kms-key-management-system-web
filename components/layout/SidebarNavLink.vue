<template>
  <div>
    <SidebarMenu>
      <template v-for="menu in navMenu" :key="menu.heading">
        <SidebarMenuHeading>{{ menu.heading }}</SidebarMenuHeading>
        <template v-for="item in menu.items" :key="item.title">
          <SidebarMenuItem v-if="!item.children">
            <SidebarMenuLink :to="item.link">
              <Icon :name="item.icon" class="mr-2 h-4 w-4" />
              {{ item.title }}
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuSubmenu v-else>
            <SidebarMenuSubmenuTrigger>
              <Icon :name="item.icon" class="mr-2 h-4 w-4" />
              {{ item.title }}
            </SidebarMenuSubmenuTrigger>
            <SidebarMenuSubmenuContent>
              <template v-for="child in item.children" :key="child.title">
                <SidebarMenuItem>
                  <SidebarMenuLink :to="child.link">
                    <Icon :name="child.icon" class="mr-2 h-4 w-4" />
                    {{ child.title }}
                  </SidebarMenuLink>
                </SidebarMenuItem>
              </template>
            </SidebarMenuSubmenuContent>
          </SidebarMenuSubmenu>
        </template>
      </template>
    </SidebarMenu>
  </div>
</template>

<script setup lang="ts">
import { getNavMenu } from '~/constants/menus';

const navMenu = getNavMenu();
</script>