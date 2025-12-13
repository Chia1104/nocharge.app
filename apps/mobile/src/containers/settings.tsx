import { useMemo, useCallback } from "react";

import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import {
  Accordion,
  Button,
  cn,
  useAccordionItem,
  useToast,
  Card,
  Avatar,
} from "heroui-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  Easing,
  Keyframe,
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

import { AuthGuard } from "@/components/auth-guard";
import { LocaleSelector } from "@/components/locale-selector";
import { authClient } from "@/libs/auth/client";
import type { Session } from "@/libs/auth/client";

const LAYOUT_TRANSITION = LinearTransition.springify()
  .damping(70)
  .stiffness(1000)
  .mass(2);

const StyledIonicons = withUniwind(Ionicons);

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  action?: React.ReactNode;
}

const classNames = {
  triggerContentContainer: "flex-row items-center flex-1 gap-3",
  triggerTitle: "text-foreground text-base flex-1",
  contentText: "text-muted text-base/relaxed",
};

const CUSTOM_INDICATOR_ENTERING = ZoomIn.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CLOSE_INDICATOR_ENTERING = new Keyframe({
  0: {
    opacity: 0.5,
    transform: [{ rotate: "-210deg" }],
  },
  100: {
    opacity: 1,
    transform: [{ rotate: "0deg" }],
  },
});

const CUSTOM_INDICATOR_EXITING = ZoomOut.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CustomIndicator = () => {
  const { isExpanded } = useAccordionItem();

  return (
    <View className="size-5 items-center justify-center">
      {isExpanded ? (
        <Animated.View
          key="close"
          entering={CLOSE_INDICATOR_ENTERING.duration(250)}
          exiting={CUSTOM_INDICATOR_EXITING}>
          <StyledIonicons name="close" size={18} className="text-muted" />
        </Animated.View>
      ) : (
        <Animated.View
          key="expand"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}>
          <StyledIonicons name="add" size={18} className="text-muted" />
        </Animated.View>
      )}
    </View>
  );
};

interface AccordionItemProps {
  item: AccordionItem;
}

const AccordionItemContent = ({ item }: AccordionItemProps) => {
  return (
    <Animated.View
      layout={LAYOUT_TRANSITION}
      style={[
        styles.borderCurve,
        {
          transitionProperty: "transform",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease-out",
          transform: [
            {
              scale: 1,
            },
          ],
        },
      ]}>
      <Animated.View
        layout={LAYOUT_TRANSITION}
        className={cn("bg-surface overflow-hidden rounded-2xl")}>
        <Accordion.Trigger className="p-5">
          <View className={classNames.triggerContentContainer}>
            <Text className={classNames.triggerTitle}>{item.title}</Text>
          </View>
          <Accordion.Indicator>
            <CustomIndicator />
          </Accordion.Indicator>
        </Accordion.Trigger>
        <Accordion.Content className="p-5 pt-0 flex flex-col gap-2">
          <Text className={classNames.contentText}>{item.content}</Text>
          {item.action}
        </Accordion.Content>
      </Animated.View>
    </Animated.View>
  );
};

const PersonalInformation = ({ session }: { session: Session }) => {
  return (
    <Card>
      <Card.Header className="flex-row items-center gap-3">
        <Avatar alt={session.user.name}>
          <Avatar.Image src={session.user.image ?? undefined} />
          <Avatar.Fallback>{session.user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
        <View className="flex-1">
          <Card.Title>{session.user.name}</Card.Title>
          <Card.Description className="text-sm">
            {session.user.email}
          </Card.Description>
        </View>
      </Card.Header>
    </Card>
  );
};

export const Settings = () => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();

  const accordionData = useMemo(() => {
    return [
      {
        id: "1",
        title: t("language.title"),
        content: t("language.description"),
        action: <LocaleSelector />,
      },
    ] satisfies AccordionItem[];
  }, [t]);

  const handleLogout = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/signin");
        },
        onError: () => {
          toast.show({
            label: t("error.title"),
            description: t("auth.logout-failed"),
            variant: "danger",
          });
        },
      },
    });
  }, [router, t, toast]);

  return (
    <View
      className="flex-1 justify-between px-5"
      style={{
        paddingTop: headerHeight + 20,
        paddingBottom: insets.bottom + 110,
      }}>
      <View className="flex-1 gap-4">
        <AuthGuard disableRedirect>
          {(session) => <PersonalInformation session={session} />}
        </AuthGuard>
        <Accordion className="w-full overflow-visible">
          {accordionData.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="overflow-visible">
              <AccordionItemContent item={item} />
            </Accordion.Item>
          ))}
        </Accordion>
      </View>
      <AuthGuard disableRedirect>
        <Button onPress={handleLogout} variant="danger-soft">
          {t("auth.logout")}
        </Button>
      </AuthGuard>
    </View>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
});
