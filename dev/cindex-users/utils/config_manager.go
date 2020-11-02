package utils

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"sync"
)

/*
 Simple interface that allows us to switch out both implementations of the Manager
*/
type ConfigManager interface {
	Set(*Config)
	Get() *Config
	Close()
}

/*
 This struct manages the configuration instance by
 preforming locking around access to the Config struct.
*/
var cm *MutexConfigManager

type MutexConfigManager struct {
	conf  *Config
	mutex *sync.Mutex
}

func NewMutexConfigManager(appConfigFile string) *MutexConfigManager {
	config := loadConfig(appConfigFile)
	cm = &MutexConfigManager{config, &sync.Mutex{}}
	return cm
}

func GetConfigManager() *MutexConfigManager {
	return cm
}

func (m *MutexConfigManager) Set(conf *Config) {
	m.mutex.Lock()
	m.conf = conf
	m.mutex.Unlock()
}

func (m *MutexConfigManager) Get() *Config {
	m.mutex.Lock()
	temp := m.conf
	m.mutex.Unlock()
	return temp
}

func (m *MutexConfigManager) Close() {
	//Do Nothing
}

func loadConfig(configFile string) *Config {
	conf := &Config{}
	if _, err := toml.DecodeFile(configFile, &conf); err != nil {
		fmt.Println(err)
	}
	return conf
}

