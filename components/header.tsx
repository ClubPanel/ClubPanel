import { Box } from "@chakra-ui/layout";
import { useBreakpointValue, Button, Collapse, Flex, IconButton, Stack, Text, useDisclosure, Link, Icon, chakra, useUpdateEffect, BoxProps, HStack } from "@chakra-ui/react";
import { AnimatePresence, motion, useElementScroll, useViewportScroll } from "framer-motion";
import React, { Component } from "react";
import {FaMoon, FaSun, FaBars, FaTimes} from "react-icons/fa";
import { RemoveScroll } from "react-remove-scroll";
import Logo from "./logo";
import MenuItems, {IMenuLink} from "./menu/menuItems";

const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 21 21" width="20" height="20" {...props}>
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  </svg>
);

const HeaderContent = ({ name, sidebar }: { name: string, sidebar: Record<string, IMenuLink[]> }) => {
  const mobileNav = useDisclosure();

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

  return (
    <>
      <HStack w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <chakra.a href="/" display="block" aria-label="ClubPanel Homepage">
            <Logo name={name}/>
          </chakra.a>
        </Flex>

        <Flex
          justify="flex-end"
          w="100%"
          align="center"
          maxW="1100px"
          display={{ base: "none", md: "flex" }}
        >
        </Flex>

        <HStack spacing="5" display={{ base: "none", md: "flex" }}>
          <Link
            isExternal
            aria-label="Go to ClubPanel's GitHub page"
            href="https://github.com/uellenberg/ClubPanel"
          >
            <Icon
              as={GithubIcon}
              display="block"
              transition="color 0.2s"
              w="5"
              h="5"
              _hover={{color: "gray.600"}}
            />
          </Link>
        </HStack>

        <IconButton
          //@ts-ignore
          ref={mobileNavBtnRef}
          display="flex"
          aria-label="Open menu"
          fontSize="20px"
          color="white"
          variant="ghost"
          icon={<FaBars/>}
          onClick={() => mobileNav.isOpen ? mobileNav.onClose() : mobileNav.onOpen()}
        />
      </HStack>

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} name={name} sidebar={sidebar} />
    </>
  );
};

interface MobileNavContentProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function MobileNavContent(props: MobileNavContentProps & { name: string, sidebar: Record<string, IMenuLink[]> }) : JSX.Element {
  const { isOpen, onClose } = props;
  const closeBtnRef = React.useRef<HTMLButtonElement>();

  /**
     * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
     * Result: We'll close the menu
     */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false });

  React.useEffect(() => {
    if (showOnBreakpoint == false && onClose) {
      onClose();
    }
  }, [showOnBreakpoint]);

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
  }, [isOpen]);

  const [_, setShadow] = React.useState<string>();

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w={{base: "100%", md: "15rem"}}
              bg={{base: "#222831", md: "#1B2027"}}
              h={{base: "100vh", md: ""}}
              overflow="auto"
              pos="absolute"
              top={{base: "0", md: "72px"}}
              left={{base: "0", md: "calc(-15rem + 100vw)"}}
              zIndex={20}
              pb="8"
            >
              <Box>
                <Flex justify="space-between" px="6" pt="5" pb="4">
                  <Logo name={props.name}/>
                  <IconButton
                    display={{ base: "flex", md: "none" }}
                    aria-label="Close menu"
                    fontSize="20px"
                    color="inherit"
                    variant="ghost"
                    icon={<FaTimes/>}
                    onClick={onClose}
                  />
                </Flex>
              </Box>

              <ScrollView
                onScroll={(scrolled) => {
                  setShadow(scrolled ? "md" : undefined);
                }}
              >
                <MenuItems sidebar={props.sidebar}/>
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props;
  const [y, setY] = React.useState(0);
  const elRef = React.useRef<any>();
  const { scrollY } = useElementScroll(elRef);
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  useUpdateEffect(() => {
    onScroll?.(y > 5);
  }, [y]);

  return (
    <Box
      ref={elRef}
      flex="1"
      id="routes"
      overflow="auto"
      px="6"
      pb="6"
      {...rest}
    />
  );
};

const Header = ({ name, sidebar }: { name: string, sidebar: Record<string, IMenuLink[]> }) : JSX.Element => {
  const [_, setY] = React.useState(0);
  const ref = React.useRef<HTMLHeadingElement>();

  const {scrollY} = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      //@ts-ignore
      ref={ref}
      transition="box-shadow 0.2s, background-color 0.2s"
      shadow="md"
      pos="sticky"
      top="0"
      zIndex="3"
      bg="#222831"
      left="0"
      right="0"
      width="full"
    >
      <chakra.div height="4.5rem" mx="auto" maxW="8xl">
        <HeaderContent name={name} sidebar={sidebar}/>
      </chakra.div>
    </chakra.header>
  );
};

export default Header;