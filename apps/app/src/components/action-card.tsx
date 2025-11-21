import type { FC } from "react";

import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import type { Href } from "expo-router";
import { Card, cn } from "heroui-native";
import { Image, Pressable, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FadeIn } from "react-native-reanimated";
import { withUniwind } from "uniwind";

import { useAppTheme } from "@/contexts/app-theme.context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const StyledFeather = withUniwind(Feather);

export interface ActionCardProps {
  title?: string;
  footer?: string;
  path: Href;
  children?: React.ReactNode;
}

export const ActionCard: FC<ActionCardProps & { index: number }> = ({
  title,
  footer,
  path,
  index,
  children,
}) => {
  const router = useRouter();

  const { isDark } = useAppTheme();

  const rLightImageStyle = useAnimatedStyle(() => {
    return {
      opacity: isDark ? 0 : withTiming(0.4),
    };
  });

  const rDarkImageStyle = useAnimatedStyle(() => {
    return {
      opacity: isDark ? withTiming(0.4) : 0,
    };
  });

  return (
    <AnimatedPressable
      entering={FadeInDown.duration(300)
        .delay(index * 100)
        .easing(Easing.out(Easing.ease))}
      onPress={() => router.push(path)}>
      <Card
        className={cn(
          "p-0 border border-zinc-200 rounded-3xl overflow-hidden",
          isDark && "border-zinc-900"
        )}>
        <AnimatedView
          entering={FadeIn}
          className="absolute inset-0 w-full h-full">
          <AnimatedImage
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require("~/assets/hero-bg-light.png")}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            style={rLightImageStyle}
          />
          <AnimatedImage
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require("~/assets/hero-bg-dark.png")}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            style={rDarkImageStyle}
          />
        </AnimatedView>
        <View className="gap-4">
          {children ?? (
            <>
              <Card.Body className="h-16" />
              <Card.Footer className="px-3 pb-3 flex-row items-end gap-4">
                <View className="flex-1">
                  <Card.Title className="text-2xl text-foreground/85">
                    {title}
                  </Card.Title>
                  <Card.Description className="text-foreground/65 pl-0.5">
                    {footer}
                  </Card.Description>
                </View>
                <View className="size-9 rounded-full bg-background/25 items-center justify-center">
                  <StyledFeather
                    name="arrow-up-right"
                    size={20}
                    className="text-foreground rounded-full"
                  />
                </View>
              </Card.Footer>
            </>
          )}
        </View>
      </Card>
    </AnimatedPressable>
  );
};
