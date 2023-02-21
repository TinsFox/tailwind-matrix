import * as NavigationMenuPrimitives from "@radix-ui/react-navigation-menu";

export function NavigationMenu() {
  return (
    <NavigationMenuPrimitives.Root className="relative z-[1] flex w-screen justify-center">
      <NavigationMenuPrimitives.List>
        <NavigationMenuPrimitives.Item>
          <NavigationMenuPrimitives.Trigger />
          <NavigationMenuPrimitives.Content>
            <NavigationMenuPrimitives.Link />
          </NavigationMenuPrimitives.Content>
        </NavigationMenuPrimitives.Item>

        <NavigationMenuPrimitives.Item>
          <NavigationMenuPrimitives.Link />
        </NavigationMenuPrimitives.Item>

        <NavigationMenuPrimitives.Item>
          <NavigationMenuPrimitives.Trigger />
          <NavigationMenuPrimitives.Content>
            <NavigationMenuPrimitives.Sub>
              <NavigationMenuPrimitives.List />
              <NavigationMenuPrimitives.Viewport />
            </NavigationMenuPrimitives.Sub>
          </NavigationMenuPrimitives.Content>
        </NavigationMenuPrimitives.Item>

        <NavigationMenuPrimitives.Indicator />
      </NavigationMenuPrimitives.List>

      <NavigationMenuPrimitives.Viewport />
    </NavigationMenuPrimitives.Root>
  );
}
